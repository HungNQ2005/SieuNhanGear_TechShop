import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  View,
  ScrollView,
  Text,
} from "react-native";
import { useNavigate } from "react-router-dom";

import Sidebar from "../Sidebar";
import AdminTopBar from "../AdminTopBar";
import VoucherHeader from "./components/VoucherHeader";
import VoucherStatistics from "./components/VoucherStatistics";
import VoucherFilterBar from "./components/VoucherFilterBar";
import VoucherTable from "./components/VoucherTable";
import VoucherModal from "./components/VoucherModal";
import Pagination from "../InventoryManagement/components/Pagination";

import { useLocalization } from "../../../../providers/LocalizationProvider";

import {
  getVouchers,
  createVoucher,
  updateVoucher,
  deleteVoucher,
} from "../../../../services/api";

import {
  TEXT_VOUCHER_SEARCH,
} from "../../../../constants/i18nKeys";

import styles from "./VoucherManagement.styles";

const PAGE_SIZE = 10;

function computeVoucherStatus(voucher) {
  return voucher.isActive ? "active" : "inactive";
}

export default function VoucherManagementScreen() {
  const { t } = useLocalization();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [vouchers, setVouchers] = useState([]);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("all");

  const [page, setPage] = useState(1);

  const [modalVisible, setModalVisible] = useState(false);

  const [selectedVoucher, setSelectedVoucher] = useState(null);

  const [saving, setSaving] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);

    try {
      const res = await getVouchers();

      const data = (res.data || []).map((voucher) => ({
        ...voucher,
        status: computeVoucherStatus(voucher),
      }));

      setVouchers(data);
    } catch (err) {
      console.log("Load vouchers failed", err);
      setVouchers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!user || (user.role !== "product_manager" && user.role !== "system_admin" && user.role !== "admin")) {
      navigate("/");
      return;
    }
    loadData();
  }, [loadData, navigate]);

  const voucherStats = useMemo(() => {
    return {
      total: vouchers.length,
      active: vouchers.filter((v) => v.status === "active").length,
      inactive: vouchers.filter((v) => v.status === "inactive").length,
      // The API doesn't expose redemption/usage data yet, so this is
      // left at 0 until a usage-tracking field is added to the voucher model.
      used: 0,
    };
  }, [vouchers]);

  const filteredVouchers = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return vouchers.filter((voucher) => {
      if (
        keyword &&
        !voucher.code?.toLowerCase().includes(keyword)
      ) {
        return false;
      }

      if (
        statusFilter !== "all" &&
        voucher.status !== statusFilter
      ) {
        return false;
      }

      return true;
    });
  }, [
    vouchers,
    search,
    statusFilter,
  ]);

  useEffect(() => {
    setPage(1);
  }, [
    search,
    statusFilter,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredVouchers.length / PAGE_SIZE)
  );

  const pagedVouchers = filteredVouchers.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const handleCreate = () => {
    setSelectedVoucher(null);
    setModalVisible(true);
  };

  const handleEdit = (voucher) => {
    setSelectedVoucher(voucher);
    setModalVisible(true);
  };

  const handleSave = async (data) => {
    setSaving(true);

    try {
      if (data.id) {
        await updateVoucher(data.id, data);
      } else {
        await createVoucher(data);
      }

      await loadData();

      setModalVisible(false);

      setSelectedVoucher(null);
    } catch (err) {
      console.log("Save voucher error", err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (voucher) => {
    try {
      await deleteVoucher(voucher.id);

      setVouchers((prev) =>
        prev.filter((item) => item.id !== voucher.id)
      );
    } catch (err) {
      console.log("Delete voucher error", err);
    }
  };
    return (
    <View style={styles.root}>
      <Sidebar selected="voucher" />

      <View style={styles.main}>
        <AdminTopBar
          search={search}
          onSearchChange={setSearch}
          searchPlaceholder={t(TEXT_VOUCHER_SEARCH)}
        />

        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <VoucherHeader
            search={search}
            onSearchChange={setSearch}
            onCreate={handleCreate}
          />

          <VoucherStatistics
            total={voucherStats.total}
            active={voucherStats.active}
            inactive={voucherStats.inactive}
            used={voucherStats.used}
          />

          <VoucherFilterBar
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
            from={
              filteredVouchers.length
                ? (page - 1) * PAGE_SIZE + 1
                : 0
            }
            to={Math.min(
              page * PAGE_SIZE,
              filteredVouchers.length
            )}
            total={filteredVouchers.length}
          />

          {loading ? (
            <Text
              style={{
                color: "#9CA3AF",
                paddingVertical: 40,
                textAlign: "center",
              }}
            >
              Loading...
            </Text>
          ) : (
            <>
              <VoucherTable
                rows={pagedVouchers}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />

              <View
                style={{
                  marginTop: 24,
                  alignItems: "flex-end",
                }}
              >
                <Pagination
                  page={page}
                  totalPages={totalPages}
                  onChange={setPage}
                />
              </View>
            </>
          )}

          <View style={{ height: 40 }} />
        </ScrollView>
      </View>

      <VoucherModal
        visible={modalVisible}
        voucher={selectedVoucher}
        saving={saving}
        onClose={() => {
          setModalVisible(false);
          setSelectedVoucher(null);
        }}
        onConfirm={handleSave}
      />
    </View>
  );
}
