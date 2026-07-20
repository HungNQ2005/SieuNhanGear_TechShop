import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    ActivityIndicator,
    TouchableOpacity,
    Alert,
    Modal,
} from 'react-native';
import api from '../../../services/api';
import { API } from '../../../constants/apiURL';
import { styles } from '../styles/ProfileInformation.styles';

export default function ProfileInformation({ accountId }) {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [account, setAccount] = useState(null);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    // State cho đổi mật khẩu
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [passwordForm, setPasswordForm] = useState({ newPassword: '', confirmPassword: '' });
    const [passwordError, setPasswordError] = useState('');
    const [changingPassword, setChangingPassword] = useState(false);

    // Form state khi edit
    const [editForm, setEditForm] = useState({
        name: '',
        phone: '',
        dateOfBirth: '',
        address: '',
    });

    // Hàm validate mật khẩu
    const validatePassword = (pwd) => {
        if (pwd.length < 8) return 'Mật khẩu tối thiểu 8 ký tự';
        if (!/[A-Z]/.test(pwd)) return 'Mật khẩu phải có ít nhất 1 chữ in hoa';
        if (!/[0-9]/.test(pwd)) return 'Mật khẩu phải có ít nhất 1 chữ số';
        if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd)) {
            return 'Mật khẩu phải có ít nhất 1 ký tự đặc biệt';
        }
        return '';
    };

    // Lấy dữ liệu ban đầu
    const fetchAccount = async () => {
        if (!accountId) return;
        setLoading(true);
        try {
            const response = await api.get(API.GET_ACCOUNT_BY_ID(accountId));
            const data = response.data.data;
            setAccount(data);
            setEditForm({
                name: data.name || '',
                phone: data.phone || '',
                dateOfBirth: data.dateOfBirth ? data.dateOfBirth.split('T')[0] : '',
                address: data.address || '',
            });
        } catch (err) {
            setError('Failed to load profile');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAccount();
    }, [accountId]);

    // Xử lý lưu thay đổi thông tin
    const handleSave = async () => {
        setSaving(true);
        try {
            const payload = {
                name: editForm.name.trim(),
                phone: editForm.phone.trim() || undefined,
                dateOfBirth: editForm.dateOfBirth ? new Date(editForm.dateOfBirth).toISOString() : undefined,
                address: editForm.address.trim() || undefined,
            };

            const response = await api.put(API.UPDATE_ACCOUNT(accountId), payload);
            const updated = response.data.data;

            setAccount(updated);
            setEditForm({
                name: updated.name || '',
                phone: updated.phone || '',
                dateOfBirth: updated.dateOfBirth ? updated.dateOfBirth.split('T')[0] : '',
                address: updated.address || '',
            });
            setIsEditing(false);
            Alert.alert('Thành công', 'Cập nhật thông tin thành công');
        } catch (err) {
            console.error(err);
            Alert.alert('Lỗi', err.response?.data?.message || 'Không thể cập nhật thông tin');
        } finally {
            setSaving(false);
        }
    };

    // Xử lý đổi mật khẩu
    const handleChangePassword = async () => {
        const { currentPassword, newPassword, confirmPassword } = passwordForm;
        if (!currentPassword || !newPassword || !confirmPassword) {
            setPasswordError('Vui lòng nhập đầy đủ thông tin');
            return;
        }
        if (newPassword !== confirmPassword) {
            setPasswordError('Mật khẩu xác nhận không khớp');
            return;
        }
        const validationError = validatePassword(newPassword);
        if (validationError) {
            setPasswordError(validationError);
            return;
        }
        setChangingPassword(true);
        try {
            await api.put(API.UPDATE_ACCOUNT(accountId), {
                currentPassword,
                password: newPassword,
            });
            Alert.alert('Thành công', 'Mật khẩu đã được cập nhật');
            setShowChangePassword(false);
            setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
            setPasswordError('');
        } catch (err) {
            Alert.alert('Lỗi', err.response?.data?.message || 'Không thể cập nhật mật khẩu');
        } finally {
            setChangingPassword(false);
        }
    };

    const handleCancel = () => {
        setEditForm({
            name: account.name || '',
            phone: account.phone || '',
            dateOfBirth: account.dateOfBirth ? account.dateOfBirth.split('T')[0] : '',
            address: account.address || '',
        });
        setIsEditing(false);
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return date.toLocaleDateString('vi-VN');
    };

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#2563EB" />
            </View>
        );
    }

    if (error || !account) {
        return (
            <View style={styles.center}>
                <Text style={styles.errorText}>{error || 'No data'}</Text>
                <TouchableOpacity onPress={fetchAccount} style={styles.retryButton}>
                    <Text style={styles.retryText}>Thử lại</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <Text style={styles.title}>Profile Information</Text>
            </View>

            {/* Email – Read-only */}
            <View style={styles.infoRow}>
                <Text style={styles.label}>Email:</Text>
                <Text style={styles.value}>{account.email}</Text>
            </View>

            {/* Các trường có thể sửa */}
            <View style={styles.infoRow}>
                <Text style={styles.label}>Name:</Text>
                {isEditing ? (
                    <TextInput
                        style={styles.input}
                        value={editForm.name}
                        onChangeText={(text) => setEditForm({ ...editForm, name: text })}
                        placeholder="Nhập tên"
                    />
                ) : (
                    <Text style={styles.value}>{account.name}</Text>
                )}
            </View>

            <View style={styles.infoRow}>
                <Text style={styles.label}>Phone:</Text>
                {isEditing ? (
                    <TextInput
                        style={styles.input}
                        value={editForm.phone}
                        onChangeText={(text) => setEditForm({ ...editForm, phone: text })}
                        placeholder="Nhập số điện thoại"
                        keyboardType="phone-pad"
                    />
                ) : (
                    <Text style={styles.value}>{account.phone || 'Chưa cập nhật'}</Text>
                )}
            </View>

            <View style={styles.infoRow}>
                <Text style={styles.label}>Date of Birth:</Text>
                {isEditing ? (
                    <TextInput
                        style={styles.input}
                        value={editForm.dateOfBirth}
                        onChangeText={(text) => setEditForm({ ...editForm, dateOfBirth: text })}
                        placeholder="YYYY-MM-DD"
                    />
                ) : (
                    <Text style={styles.value}>{formatDate(account.dateOfBirth) || 'Chưa cập nhật'}</Text>
                )}
            </View>

            <View style={styles.infoRow}>
                <Text style={styles.label}>Address:</Text>
                {isEditing ? (
                    <TextInput
                        style={styles.input}
                        value={editForm.address}
                        onChangeText={(text) => setEditForm({ ...editForm, address: text })}
                        placeholder="Nhập địa chỉ"
                    />
                ) : (
                    <Text style={styles.value}>{account.address || 'Chưa cập nhật'}</Text>
                )}
            </View>

            {/* Nút hành động khi edit */}
            {isEditing && (
                <View style={styles.actionRow}>
                    <TouchableOpacity
                        style={[styles.actionButton, styles.cancelButton]}
                        onPress={handleCancel}
                        disabled={saving}
                    >
                        <Text style={styles.actionButtonText}>Hủy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.actionButton, styles.saveButton]}
                        onPress={handleSave}
                        disabled={saving}
                    >
                        {saving ? (
                            <ActivityIndicator size="small" color="#fff" />
                        ) : (
                            <Text style={styles.actionButtonText}>Lưu</Text>
                        )}
                    </TouchableOpacity>
                </View>
            )}

            {!isEditing && (
                <TouchableOpacity onPress={() => setIsEditing(true)} style={styles.editButton}>
                    <Text style={styles.editButtonText}>✎ Sửa</Text>
                </TouchableOpacity>
            )}

            {/* Nút đổi mật khẩu */}
            {!isEditing && (
                <TouchableOpacity
                    style={styles.changePasswordButton}
                    onPress={() => setShowChangePassword(true)}
                >
                    <Text style={styles.changePasswordText}>Đổi mật khẩu</Text>
                </TouchableOpacity>
            )}

            {/* Modal đổi mật khẩu */}
            <Modal
                visible={showChangePassword}
                transparent
                animationType="slide"
                onRequestClose={() => {
                    setShowChangePassword(false);
                    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
                    setPasswordError('');
                }}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Đổi mật khẩu</Text>
                        <Text style={styles.modalSubtitle}>Cập nhật mật khẩu để bảo vệ tài khoản của bạn</Text>

                        {/* Mật khẩu hiện tại */}
                        <TextInput
                            style={styles.input}
                            placeholder="Nhập mật khẩu hiện tại"
                            secureTextEntry
                            value={passwordForm.currentPassword}
                            onChangeText={(text) => {
                                setPasswordForm({ ...passwordForm, currentPassword: text });
                                setPasswordError('');
                            }}
                        />

                        {/* Mật khẩu mới */}
                        <TextInput
                            style={styles.input}
                            placeholder="Nhập mật khẩu mới"
                            secureTextEntry
                            value={passwordForm.newPassword}
                            onChangeText={(text) => {
                                setPasswordForm({ ...passwordForm, newPassword: text });
                                setPasswordError('');
                            }}
                        />

                        {/* Xác nhận mật khẩu mới */}
                        <TextInput
                            style={styles.input}
                            placeholder="Nhập lại mật khẩu mới"
                            secureTextEntry
                            value={passwordForm.confirmPassword}
                            onChangeText={(text) => {
                                setPasswordForm({ ...passwordForm, confirmPassword: text });
                                setPasswordError('');
                            }}
                        />

                        {/* Hiển thị yêu cầu mật khẩu */}
                        <View style={styles.passwordRequirements}>
                            <Text style={styles.requirementsTitle}>Yêu cầu mật khẩu</Text>
                            <View style={styles.passwordRequirements}>
                                <Text style={styles.requirementsTitle}>Yêu cầu mật khẩu</Text>

                                <View style={styles.requirementItem}>
                                    <View
                                        style={[
                                            styles.requirementDot,
                                            passwordForm.newPassword.length >= 8 &&
                                            styles.requirementDotActive,
                                        ]}
                                    />
                                    <Text style={styles.requirementText}>
                                        Tối thiểu 8 ký tự
                                    </Text>
                                </View>

                                <View style={styles.requirementItem}>
                                    <View
                                        style={[
                                            styles.requirementDot,
                                            /[A-Z]/.test(passwordForm.newPassword) &&
                                            styles.requirementDotActive,
                                        ]}
                                    />
                                    <Text style={styles.requirementText}>
                                        Ít nhất 1 chữ in hoa
                                    </Text>
                                </View>

                                <View style={styles.requirementItem}>
                                    <View
                                        style={[
                                            styles.requirementDot,
                                            /[0-9]/.test(passwordForm.newPassword) &&
                                            styles.requirementDotActive,
                                        ]}
                                    />
                                    <Text style={styles.requirementText}>
                                        Ít nhất 1 chữ số
                                    </Text>
                                </View>

                                <View style={styles.requirementItem}>
                                    <View
                                        style={[
                                            styles.requirementDot,
                                            /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(passwordForm.newPassword) &&
                                            styles.requirementDotActive,
                                        ]}
                                    />
                                    <Text style={styles.requirementText}>
                                        Ít nhất 1 ký tự đặc biệt
                                    </Text>
                                </View>
                            </View>
                        </View>

                        {passwordError ? (
                            <Text style={styles.errorText}>{passwordError}</Text>
                        ) : null}

                        <View style={styles.modalActions}>
                            <TouchableOpacity
                                style={[styles.actionButton, styles.cancelButton]}
                                onPress={() => {
                                    setShowChangePassword(false);
                                    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
                                    setPasswordError('');
                                }}
                            >
                                <Text style={styles.actionButtonText}>Hủy</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.actionButton, styles.saveButton]}
                                onPress={handleChangePassword}
                                disabled={changingPassword}
                            >
                                {changingPassword ? (
                                    <ActivityIndicator size="small" color="#fff" />
                                ) : (
                                    <Text style={styles.actionButtonText}>Cập nhật mật khẩu</Text>
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}