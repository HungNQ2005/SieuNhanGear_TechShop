import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    ActivityIndicator,
    TouchableOpacity,
    Modal,
} from 'react-native';
import api from '../../../services/api';
import { API } from '../../../constants/apiURL';
import { styles } from '../styles/ProfileInformation.styles';
import { useLocalization } from '../../../providers/LocalizationProvider';
import {
    TEXT_PROFILE_INFO,
    TEXT_PROFILE_EDIT,
    TEXT_PROFILE_CHANGE_PASSWORD,
    TEXT_PROFILE_CANCEL,
    TEXT_PROFILE_SAVE,
    TEXT_PROFILE_PHONE,
    TEXT_PROFILE_DOB,
    TEXT_PROFILE_ADDRESS,
    TEXT_PROFILE_NOT_UPDATED,
    TEXT_EMAIL,
    TEXT_NAME
} from '../../../constants/i18nKeys';

export default function ProfileInformation({ accountId }) {
    const { t } = useLocalization();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [account, setAccount] = useState(null);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    // State cho đổi mật khẩu
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
    const [passwordError, setPasswordError] = useState('');
    const [changingPassword, setChangingPassword] = useState(false);

    // Form state khi edit
    const [editForm, setEditForm] = useState({
        name: '',
        phone: '',
        dateOfBirth: '',
        address: '',
    });

    const validatePassword = (pwd) => {
        if (pwd.length < 6) return 'Mật khẩu tối thiểu 6 ký tự';
        return '';
    };

    const fetchAccount = async () => {
        setLoading(true);
        setError(null);
        try {
            let data = null;
            if (accountId) {
                try {
                    const response = await api.get(API.GET_ACCOUNT_BY_ID(accountId));
                    data = response.data?.data || response.data;
                } catch (e) {
                    console.log("Get account by ID failed, falling back to /me", e);
                }
            }

            if (!data) {
                try {
                    const meRes = await api.get("/api/auth/me");
                    data = meRes.data?.account || meRes.data?.data || meRes.data;
                } catch (e) {
                    console.log("Get /me failed, falling back to localStorage", e);
                }
            }

            if (!data && typeof localStorage !== 'undefined') {
                const savedUser = localStorage.getItem("user");
                data = savedUser ? JSON.parse(savedUser) : null;
            }

            if (data) {
                setAccount(data);
                setEditForm({
                    name: data.name || '',
                    phone: data.phone || '',
                    dateOfBirth: data.dateOfBirth ? String(data.dateOfBirth).split('T')[0] : '',
                    address: data.address || '',
                });
            } else {
                setError('Không thể tải thông tin cá nhân');
            }
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

    const handleSave = async () => {
        setSaving(true);
        try {
            const payload = {
                name: editForm.name.trim(),
                phone: editForm.phone.trim() || undefined,
                dateOfBirth: editForm.dateOfBirth ? new Date(editForm.dateOfBirth).toISOString() : undefined,
                address: editForm.address.trim() || undefined,
            };

            const response = await api.put(`/api/auth/me`, payload);
            const updated = response.data?.account || response.data?.data || response.data;

            setAccount(updated);
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem("user", JSON.stringify(updated));
            }
            setEditForm({
                name: updated.name || '',
                phone: updated.phone || '',
                dateOfBirth: updated.dateOfBirth ? String(updated.dateOfBirth).split('T')[0] : '',
                address: updated.address || '',
            });
            setIsEditing(false);
            if (typeof window !== 'undefined') {
                window.alert('Cập nhật thông tin thành công!');
            }
        } catch (err) {
            console.error(err);
            if (typeof window !== 'undefined') {
                window.alert(err.response?.data?.message || 'Không thể cập nhật thông tin');
            }
        } finally {
            setSaving(false);
        }
    };

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
            await api.put(`/api/auth/me`, {
                currentPassword,
                password: newPassword,
            });
            if (typeof window !== 'undefined') {
                window.alert('Mật khẩu đã được cập nhật thành công');
            }
            setShowChangePassword(false);
            setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
            setPasswordError('');
        } catch (err) {
            setPasswordError(err.response?.data?.message || 'Không thể cập nhật mật khẩu');
        } finally {
            setChangingPassword(false);
        }
    };

    const handleCancel = () => {
        setEditForm({
            name: account?.name || '',
            phone: account?.phone || '',
            dateOfBirth: account?.dateOfBirth ? String(account.dateOfBirth).split('T')[0] : '',
            address: account?.address || '',
        });
        setIsEditing(false);
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return isNaN(date.getTime()) ? '' : date.toLocaleDateString('vi-VN');
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
                <Text style={styles.errorText}>{error || 'Chưa có thông tin'}</Text>
                <TouchableOpacity onPress={fetchAccount} style={styles.retryButton}>
                    <Text style={styles.retryText}>Thử lại</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <Text style={styles.title}>{t(TEXT_PROFILE_INFO)}</Text>
            </View>

            {/* Email – Read-only */}
            <View style={styles.infoRow}>
                <Text style={styles.label}>{t(TEXT_EMAIL)}:</Text>
                <Text style={styles.value}>{account.email}</Text>
            </View>

            {/* Name */}
            <View style={styles.infoRow}>
                <Text style={styles.label}>{t(TEXT_NAME)}:</Text>
                {isEditing ? (
                    <TextInput
                        style={styles.input}
                        value={editForm.name}
                        onChangeText={(text) => setEditForm({ ...editForm, name: text })}
                    />
                ) : (
                    <Text style={styles.value}>{account.name}</Text>
                )}
            </View>

            {/* Phone */}
            <View style={styles.infoRow}>
                <Text style={styles.label}>{t(TEXT_PROFILE_PHONE)}</Text>
                {isEditing ? (
                    <TextInput
                        style={styles.input}
                        value={editForm.phone}
                        onChangeText={(text) => setEditForm({ ...editForm, phone: text })}
                        keyboardType="phone-pad"
                    />
                ) : (
                    <Text style={styles.value}>{account.phone || t(TEXT_PROFILE_NOT_UPDATED)}</Text>
                )}
            </View>

            {/* Date of Birth */}
            <View style={styles.infoRow}>
                <Text style={styles.label}>{t(TEXT_PROFILE_DOB)}</Text>
                {isEditing ? (
                    <TextInput
                        style={styles.input}
                        value={editForm.dateOfBirth}
                        onChangeText={(text) => setEditForm({ ...editForm, dateOfBirth: text })}
                        placeholder="YYYY-MM-DD"
                    />
                ) : (
                    <Text style={styles.value}>{formatDate(account.dateOfBirth) || t(TEXT_PROFILE_NOT_UPDATED)}</Text>
                )}
            </View>

            {/* Address */}
            <View style={styles.infoRow}>
                <Text style={styles.label}>{t(TEXT_PROFILE_ADDRESS)}</Text>
                {isEditing ? (
                    <TextInput
                        style={styles.input}
                        value={editForm.address}
                        onChangeText={(text) => setEditForm({ ...editForm, address: text })}
                    />
                ) : (
                    <Text style={styles.value}>{account.address || t(TEXT_PROFILE_NOT_UPDATED)}</Text>
                )}
            </View>

            {/* Action buttons during edit */}
            {isEditing && (
                <View style={styles.actionRow}>
                    <TouchableOpacity
                        style={[styles.actionButton, styles.cancelButton]}
                        onPress={handleCancel}
                        disabled={saving}
                    >
                        <Text style={styles.actionButtonText}>{t(TEXT_PROFILE_CANCEL)}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.actionButton, styles.saveButton]}
                        onPress={handleSave}
                        disabled={saving}
                    >
                        {saving ? (
                            <ActivityIndicator size="small" color="#fff" />
                        ) : (
                            <Text style={styles.actionButtonText}>{t(TEXT_PROFILE_SAVE)}</Text>
                        )}
                    </TouchableOpacity>
                </View>
            )}

            {!isEditing && (
                <TouchableOpacity onPress={() => setIsEditing(true)} style={styles.editButton}>
                    <Text style={styles.editButtonText}>{t(TEXT_PROFILE_EDIT)}</Text>
                </TouchableOpacity>
            )}

            {!isEditing && (
                <TouchableOpacity
                    style={styles.changePasswordButton}
                    onPress={() => setShowChangePassword(true)}
                >
                    <Text style={styles.changePasswordText}>{t(TEXT_PROFILE_CHANGE_PASSWORD)}</Text>
                </TouchableOpacity>
            )}

            {/* Change Password Modal */}
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
                        <Text style={styles.modalTitle}>{t(TEXT_PROFILE_CHANGE_PASSWORD)}</Text>

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
                                <Text style={styles.actionButtonText}>{t(TEXT_PROFILE_CANCEL)}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.actionButton, styles.saveButton]}
                                onPress={handleChangePassword}
                                disabled={changingPassword}
                            >
                                {changingPassword ? (
                                    <ActivityIndicator size="small" color="#fff" />
                                ) : (
                                    <Text style={styles.actionButtonText}>{t(TEXT_PROFILE_CHANGE_PASSWORD)}</Text>
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}