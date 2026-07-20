import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 12,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#0F172A',
    },
    editButton: {
        backgroundColor: '#2563EB',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
    },
    editButtonText: {
        color: '#fff',
        fontWeight: '600',
    },
    infoRow: {
        flexDirection: 'row',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
        alignItems: 'center',
    },
    label: {
        width: 120,
        fontSize: 16,
        fontWeight: '500',
        color: '#64748B',
    },
    value: {
        flex: 1,
        fontSize: 16,
        color: '#0F172A',
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#CBD5E1',
        borderRadius: 6,
        paddingHorizontal: 12,
        paddingVertical: 8,
        fontSize: 16,
        color: '#0F172A',
        backgroundColor: '#F8FAFC',
    },
    actionRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 12,
        marginTop: 24,
    },
    actionButton: {
        paddingHorizontal: 24,
        paddingVertical: 10,
        borderRadius: 8,
        minWidth: 100,
        alignItems: 'center',
    },
    saveButton: {
        backgroundColor: '#2563EB',
    },
    cancelButton: {
        backgroundColor: '#E2E8F0',
    },
    actionButtonText: {
        color: '#fff',
        fontWeight: '600',
    },
    errorText: {
        color: '#EF4444',
        fontSize: 16,
        marginBottom: 12,
    },
    retryButton: {
        backgroundColor: '#2563EB',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
    },
    retryText: {
        color: '#fff',
        fontWeight: '600',
    },

    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(15,23,42,0.45)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    modalContent: {
        width: '100%',
        maxWidth: 430,
        backgroundColor: '#FFFFFF',
        borderRadius: 22,
        padding: 24,

        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowRadius: 20,
        shadowOffset: {
            width: 0,
            height: 8,
        },
        elevation: 10,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#0F172A',
        textAlign: 'center',
    },
    modalSubtitle: {
        marginTop: 8,
        marginBottom: 24,
        textAlign: 'center',
        color: '#64748B',
        fontSize: 15,
        lineHeight: 22,
    },
    modalActions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 12,
        marginTop: 20,
    },
    errorText: {
        color: '#EF4444',
        fontSize: 14,
        marginTop: 8,
        textAlign: 'center',
    },
    changePasswordButton: {
        marginTop: 20,
        alignSelf: 'flex-start',
    },
    changePasswordText: {
        color: '#2563EB',
        fontWeight: '600',
        fontSize: 16,
    },
    passwordRequirements: {
        marginVertical: 16,
        padding: 12,
        backgroundColor: '#F8FAFC',
        borderRadius: 8,
    },
    requirementsTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#0F172A',
        marginBottom: 8,
    },
    requirementItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 3,
    },
    requirementIcon: {
        fontSize: 16,
        marginRight: 8,
        width: 24,
    },
    requirementText: {
        fontSize: 14,
        color: '#334155',
    },
});