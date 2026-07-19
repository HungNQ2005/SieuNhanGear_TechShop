import React, { useEffect, useMemo, useState, useCallback } from "react";
import { View, ScrollView, Text } from "react-native";

import Sidebar from "../Sidebar";
import InventoryHeader from "./components/InventoryHeader";
import InventoryTabs from "./components/InventoryTabs";
import StockFilterBar from "./components/StockFilterBar";
import StockTable from "./components/StockTable";
import Pagination from "./components/Pagination";
import LowStockAlertsView from "./components/LowStockAlertsView";
import StockHistoryView from "./components/StockHistoryView";
import RestockModal from "./components/RestockModal";

import { useLocalization } from "../../../../providers/LocalizationProvider";
import {
  getProducts,
  getCategories,
  getWarehouses,
  getStock,
  getStockHistory,
  updateStock,
  createStockHistory,
} from "../../../../services/api";
import styles from "./InventoryManagement.styles";

const PAGE_SIZE = 10;
const CURRENT_ADMIN = "admin_alex";

function computeStatus(quantity, criticalThreshold, lowStockThreshold) {
  if (quantity <= criticalThreshold) return "urgent";
  if (quantity <= lowStockThreshold) return "low";
  return "healthy";
}

export default function InventoryManagementScreen() {
  const { t } = useLocalization();

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [stock, setStock] = useState([]);
  const [history, setHistory] = useState([]);

  const [activeTab, setActiveTab] = useState("view");
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [warehouseFilter, setWarehouseFilter] = useState("all");
  const [page, setPage] = useState(1);

  const [restockTarget, setRestockTarget] = useState(null);
  const [saving, setSaving] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [productsRes, categoriesRes, warehousesRes, stockRes, historyRes] =
        await Promise.all([
          getProducts(),
          getCategories(),
          getWarehouses(),
          getStock(),
          getStockHistory(),
        ]);
      setProducts(productsRes.data || []);
      setCategories(categoriesRes.data || []);
      setWarehouses(warehousesRes.data || []);
      setStock(stockRes.data || []);
      setHistory(historyRes.data || []);
    } catch (err) {
      console.log("Failed to load inventory data", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // ─── Joined stock rows (product + category + warehouse + computed status) ──
  const joinedStock = useMemo(() => {
    const productMap = new Map(products.map((p) => [p.id, p]));
    const categoryMap = new Map(categories.map((c) => [c.id, c]));
    const warehouseMap = new Map(warehouses.map((w) => [w.id, w]));

    return stock.map((s) => {
      const product = productMap.get(s.productId);
      const category = product ? categoryMap.get(product.category_id) : null;
      const warehouse = warehouseMap.get(s.warehouseId);
      return {
        ...s,
        product,
        category,
        warehouse,
        status: computeStatus(
          s.quantity,
          s.criticalThreshold ?? 5,
          s.lowStockThreshold ?? 15
        ),
      };
    });
  }, [stock, products, categories, warehouses]);

  const lowStockItems = useMemo(
    () =>
      joinedStock
        .filter((row) => row.status !== "healthy")
        .sort((a, b) => a.quantity - b.quantity),
    [joinedStock]
  );

  // ─── Filters for the "View Stock" tab ───────────────────────────────────────
  const filteredStock = useMemo(() => {
    const q = search.trim().toLowerCase();
    return joinedStock.filter((row) => {
      if (q && !row.product?.name?.toLowerCase().includes(q)) return false;
      if (categoryFilter !== "all" && row.product?.category_id !== categoryFilter)
        return false;
      if (warehouseFilter !== "all" && row.warehouseId !== warehouseFilter)
        return false;
      return true;
    });
  }, [joinedStock, search, categoryFilter, warehouseFilter]);

  useEffect(() => {
    setPage(1);
  }, [search, categoryFilter, warehouseFilter, activeTab]);

  const totalPages = Math.max(1, Math.ceil(filteredStock.length / PAGE_SIZE));
  const pagedStock = filteredStock.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const historyJoined = useMemo(() => {
    const productMap = new Map(products.map((p) => [p.id, p]));
    const warehouseMap = new Map(warehouses.map((w) => [w.id, w]));
    return history.map((h) => ({
      ...h,
      product: productMap.get(h.productId),
      warehouse: warehouseMap.get(h.warehouseId),
    }));
  }, [history, products, warehouses]);

  const historyTotalPages = Math.max(
    1,
    Math.ceil(historyJoined.length / PAGE_SIZE)
  );
  const pagedHistory = historyJoined.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  // ─── Restock action ──────────────────────────────────────────────────────
  const handleRestockConfirm = async (row, newQuantity, note) => {
    setSaving(true);
    const change = newQuantity - row.quantity;
    const now = new Date().toISOString();
    try {
      await updateStock(row.id, {
        quantity: newQuantity,
        lastUpdated: now,
        updatedBy: CURRENT_ADMIN,
      });
      await createStockHistory({
        productId: row.productId,
        warehouseId: row.warehouseId,
        type: change >= 0 ? "import" : "export",
        change,
        quantityAfter: newQuantity,
        date: now,
        updatedBy: CURRENT_ADMIN,
        note: note || (change >= 0 ? "Nhập kho thủ công" : "Xuất kho thủ công"),
      });

      setStock((prev) =>
        prev.map((s) =>
          s.id === row.id
            ? { ...s, quantity: newQuantity, lastUpdated: now, updatedBy: CURRENT_ADMIN }
            : s
        )
      );
      setRestockTarget(null);
    } catch (err) {
      console.log("Failed to update stock", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={styles.container}>
      <Sidebar selected="inventory" />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <InventoryHeader
          warehouseCount={warehouses.length || 4}
          search={search}
          onSearchChange={setSearch}
        />

        <InventoryTabs
          active={activeTab}
          onChange={setActiveTab}
          alertsCount={lowStockItems.length}
        />

        {loading ? (
          <Text style={{ color: "#9CA3AF", padding: 24 }}>...</Text>
        ) : (
          <>
            {activeTab === "view" && (
              <View>
                <StockFilterBar
                  categories={categories}
                  warehouses={warehouses}
                  categoryFilter={categoryFilter}
                  warehouseFilter={warehouseFilter}
                  onCategoryChange={setCategoryFilter}
                  onWarehouseChange={setWarehouseFilter}
                  from={(page - 1) * PAGE_SIZE + 1}
                  to={Math.min(page * PAGE_SIZE, filteredStock.length)}
                  total={filteredStock.length}
                />
                <StockTable rows={pagedStock} onRestock={setRestockTarget} />
                <Pagination
                  page={page}
                  totalPages={totalPages}
                  onChange={setPage}
                />
              </View>
            )}

            {activeTab === "alerts" && (
              <LowStockAlertsView
                items={lowStockItems}
                onRestock={setRestockTarget}
              />
            )}

            {activeTab === "history" && (
              <View>
                <StockHistoryView rows={pagedHistory} />
                <Pagination
                  page={page}
                  totalPages={historyTotalPages}
                  onChange={setPage}
                />
              </View>
            )}
          </>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>

      <RestockModal
        row={restockTarget}
        saving={saving}
        onClose={() => setRestockTarget(null)}
        onConfirm={handleRestockConfirm}
      />
    </View>
  );
}
