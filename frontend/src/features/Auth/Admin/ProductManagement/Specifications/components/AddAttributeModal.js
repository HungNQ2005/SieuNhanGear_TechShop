import React, { useEffect, useState } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { IconClose } from "../../../../../../constants/icons";

const DATA_TYPES = [
  { value: "text", label: "Văn bản (TEXT)" },
  { value: "number", label: "Số (NUMBER)" },
  { value: "boolean", label: "Đúng/Sai (BOOLEAN)" },
  { value: "select", label: "Tùy chọn (SELECT)" },
];

export default function AddAttributeModal({ visible, editingAttribute, groups, saving, onClose, onSubmit, onDelete }) {
  const [name, setName] = useState("");
  const [groupId, setGroupId] = useState("");
  const [dataType, setDataType] = useState("text");
  const [status, setStatus] = useState("active");
  const [error, setError] = useState("");

  useEffect(() => {
    if (editingAttribute) {
      setName(editingAttribute.name || "");
      setGroupId(String(editingAttribute.groupId || (groups[0]?.id || "")));
      setDataType(editingAttribute.dataType?.toLowerCase() || "text");
      setStatus(editingAttribute.status || "active");
    } else {
      setName("");
      setGroupId(groups[0]?.id ? String(groups[0].id) : "");
      setDataType("text");
      setStatus("active");
    }
    setError("");
  }, [editingAttribute, groups, visible]);

  const handleSubmit = () => {
    if (!name.trim()) {
      setError("Vui lòng nhập tên thuộc tính");
      return;
    }
    if (!groupId) {
      setError("Vui lòng chọn nhóm thuộc tính");
      return;
    }
    onSubmit({
      name: name.trim(),
      groupId: Number(groupId),
      dataType,
      status,
    });
  };

  if (!visible) return null;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(15, 23, 42, 0.5)",
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
        }}
      >
        <View
          style={{
            width: "100%",
            maxWidth: 480,
            backgroundColor: "#fff",
            borderRadius: 16,
            overflow: "hidden",
            shadowColor: "#0F172A",
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.15,
            shadowRadius: 25,
            elevation: 8,
          }}
        >
          {/* Header */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 24,
              paddingVertical: 18,
              borderBottomWidth: 1,
              borderColor: "#E5E7EB",
              backgroundColor: "#F8FAFC",
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "700", color: "#0F172A" }}>
              {editingAttribute ? "Chỉnh sửa thuộc tính" : "Thêm thuộc tính mới"}
            </Text>
            <TouchableOpacity onPress={onClose} style={{ padding: 4 }}>
              <IconClose color="#64748B" size={20} />
            </TouchableOpacity>
          </View>

          {/* Form */}
          <ScrollView contentContainerStyle={{ padding: 24, gap: 16 }}>
            {error ? (
              <View style={{ backgroundColor: "#FEF2F2", borderWidth: 1, borderColor: "#FCA5A5", borderRadius: 8, padding: 12 }}>
                <Text style={{ color: "#DC2626", fontSize: 13 }}>{error}</Text>
              </View>
            ) : null}

            <View>
              <Text style={{ fontSize: 13, fontWeight: "600", color: "#374151", marginBottom: 6 }}>
                Tên thuộc tính *
              </Text>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Ví dụ: Polling Rate, DPI..."
                style={{
                  borderWidth: 1,
                  borderColor: "#D1D5DB",
                  borderRadius: 8,
                  paddingHorizontal: 14,
                  paddingVertical: 10,
                  fontSize: 14,
                  color: "#111827",
                }}
              />
            </View>

            <View>
              <Text style={{ fontSize: 13, fontWeight: "600", color: "#374151", marginBottom: 6 }}>
                Nhóm thuộc tính *
              </Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
                {groups.map((g) => (
                  <TouchableOpacity
                    key={g.id}
                    onPress={() => setGroupId(String(g.id))}
                    style={{
                      paddingHorizontal: 12,
                      paddingVertical: 8,
                      borderRadius: 8,
                      borderWidth: 1,
                      borderColor: String(groupId) === String(g.id) ? "#2563EB" : "#E5E7EB",
                      backgroundColor: String(groupId) === String(g.id) ? "#EFF6FF" : "#fff",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 12.5,
                        fontWeight: String(groupId) === String(g.id) ? "700" : "500",
                        color: String(groupId) === String(g.id) ? "#2563EB" : "#374151",
                      }}
                    >
                      {g.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View>
              <Text style={{ fontSize: 13, fontWeight: "600", color: "#374151", marginBottom: 6 }}>
                Kiểu dữ liệu (Data Type)
              </Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
                {DATA_TYPES.map((dt) => (
                  <TouchableOpacity
                    key={dt.value}
                    onPress={() => setDataType(dt.value)}
                    style={{
                      paddingHorizontal: 12,
                      paddingVertical: 8,
                      borderRadius: 8,
                      borderWidth: 1,
                      borderColor: dataType === dt.value ? "#2563EB" : "#E5E7EB",
                      backgroundColor: dataType === dt.value ? "#EFF6FF" : "#fff",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 12.5,
                        fontWeight: dataType === dt.value ? "700" : "500",
                        color: dataType === dt.value ? "#2563EB" : "#374151",
                      }}
                    >
                      {dt.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>

          {/* Footer */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: editingAttribute ? "space-between" : "flex-end",
              paddingHorizontal: 24,
              paddingVertical: 16,
              borderTopWidth: 1,
              borderColor: "#E5E7EB",
              backgroundColor: "#F8FAFC",
              gap: 12,
            }}
          >
            {editingAttribute && (
              <TouchableOpacity
                onPress={() => onDelete && onDelete(editingAttribute)}
                style={{
                  backgroundColor: "#FEF2F2",
                  paddingHorizontal: 16,
                  paddingVertical: 10,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: "#FCA5A5",
                }}
              >
                <Text style={{ color: "#DC2626", fontWeight: "600", fontSize: 13 }}>Xóa thuộc tính</Text>
              </TouchableOpacity>
            )}

            <View style={{ flexDirection: "row", gap: 12 }}>
              <TouchableOpacity
                onPress={onClose}
                style={{
                  backgroundColor: "#F1F5F9",
                  paddingHorizontal: 16,
                  paddingVertical: 10,
                  borderRadius: 8,
                }}
              >
                <Text style={{ color: "#475569", fontWeight: "600", fontSize: 13 }}>Hủy</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleSubmit}
                disabled={saving}
                style={{
                  backgroundColor: saving ? "#93C5FD" : "#2563EB",
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  borderRadius: 8,
                }}
              >
                <Text style={{ color: "#fff", fontWeight: "700", fontSize: 13 }}>
                  {saving ? "Đang lưu..." : editingAttribute ? "Cập nhật" : "Tạo mới"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}
