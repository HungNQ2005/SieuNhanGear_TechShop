import React, { useMemo, useState } from "react";
import {
  Modal,
  View,
  Text,
  Pressable,
  TextInput,
  useWindowDimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { authModalStyles } from "./AuthModal.styles";
import { login, register } from "../../services/AuthService";
import { useLocalization } from "../../providers/LocalizationProvider";
import TextIntl from "../../common/TextIntl";
import {
  TEXT_LOGIN,
  TEXT_REGISTER,
  TEXT_LOGIN_SUBTITLE,
  TEXT_REGISTER_SUBTITLE,
  TEXT_EMAIL,
  TEXT_PASSWORD,
  TEXT_FORGOT_PASSWORD,
  TEXT_REMEMBER_LOGIN,
  TEXT_NO_ACCOUNT,
  TEXT_REGISTER_NOW,
  TEXT_LOGIN_ERROR,
  TEXT_NAME,
  TEXT_REGISTER_ERROR,
  TEXT_PASSWORD_MISMATCH,
  TEXT_CONFIRM_PASSWORD,
  TEXT_WELCOME_TITLE,
  TEXT_WELCOME_SUBTITLE,
  TEXT_BENEFIT_1,
  TEXT_BENEFIT_2,
  TEXT_BENEFIT_3,
  TEXT_BENEFIT_4,
  TEXT_ALREADY_HAVE_ACCOUNT,
  TEXT_COPYRIGHT,
} from "../../constants/i18nKeys";

const LOGIN = "login";
const REGISTER = "register";
function InputField({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  leftIcon,
  rightIcon,
  onRightIconPress,
}) {
  return (
    <View style={authModalStyles.fieldGroup}>
      {label ? <Text style={authModalStyles.fieldLabel}>{label}</Text> : null}
      <View style={authModalStyles.inputShell}>
        {leftIcon ? (
          <View style={authModalStyles.inputIcon}>
            <Text style={authModalStyles.inputIconText}>{leftIcon}</Text>
          </View>
        ) : null}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#94a3b8"
          style={authModalStyles.input}
          secureTextEntry={secureTextEntry}
          autoCapitalize="none"
        />
        {rightIcon ? (
          <Pressable
            style={authModalStyles.inputTrailing}
            onPress={onRightIconPress}
            disabled={!onRightIconPress}
          >
            <Text style={authModalStyles.trailingText}>{rightIcon}</Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

export default function AuthModal({ visible, onClose, onLoginSuccess }) {
  const { t } = useLocalization();
  const { width } = useWindowDimensions();
  const isCompact = width < 900;
  const [activeTab, setActiveTab] = useState(LOGIN);
  const [rememberMe, setRememberMe] = useState(true);
  const [formError, setFormError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const title = useMemo(
    () => (activeTab === LOGIN ? t(TEXT_LOGIN) : t(TEXT_REGISTER)),
    [activeTab, t],
  );
  const subtitle = useMemo(
    () =>
      activeTab === LOGIN ? t(TEXT_LOGIN_SUBTITLE) : t(TEXT_REGISTER_SUBTITLE),
    [activeTab, t],
  );
  const cardLayoutStyle = isCompact
    ? authModalStyles.cardCompact
    : authModalStyles.card;
  const isLoginFormComplete = useMemo(
    () => Boolean(loginForm.email.trim() && loginForm.password.trim()),
    [loginForm],
  );
  const isRegisterFormComplete = useMemo(
    () =>
      Boolean(
        registerForm.name.trim() &&
        registerForm.email.trim() &&
        registerForm.password.trim() &&
        registerForm.confirmPassword.trim(),
      ),
    [registerForm],
  );

  const resetAndClose = () => {
    setFormError("");
    onClose?.();
  };

  const handleTabChange = (tab) => {
    setFormError("");
    setActiveTab(tab);
  };
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleLoginSubmit = async () => {
    const email = loginForm.email.trim();
    const password = loginForm.password.trim();

    if (!email) {
      setFormError("Vui lòng nhập Email");
      return;
    }

    if (!EMAIL_REGEX.test(email)) {
      setFormError("Định dạng Email không hợp lệ (ví dụ: user@example.com)");
      return;
    }

    if (!password) {
      setFormError("Vui lòng nhập mật khẩu");
      return;
    }

    if (password.length < 6) {
      setFormError("Mật khẩu phải chứa ít nhất 6 ký tự");
      return;
    }

    setFormError("");

    try {
      const user = await login(email, password);

      if (!user) {
        setFormError(t(TEXT_LOGIN_ERROR));
        return;
      }

      onLoginSuccess?.(user);

      setFormError("");
      resetAndClose();
    } catch (err) {
      setFormError(err.message || t(TEXT_LOGIN_ERROR));
    }
  };

  const handleRegisterSubmit = async () => {
    const name = registerForm.name.trim();
    const email = registerForm.email.trim();
    const password = registerForm.password.trim();
    const confirmPassword = registerForm.confirmPassword.trim();

    if (!name) {
      setFormError("Vui lòng nhập họ và tên");
      return;
    }

    if (!email) {
      setFormError("Vui lòng nhập Email");
      return;
    }

    if (!EMAIL_REGEX.test(email)) {
      setFormError("Định dạng Email không hợp lệ (ví dụ: user@example.com)");
      return;
    }

    if (!password) {
      setFormError("Vui lòng nhập mật khẩu");
      return;
    }

    if (password.length < 6) {
      setFormError("Mật khẩu phải chứa ít nhất 6 ký tự");
      return;
    }

    if (password !== confirmPassword) {
      setFormError(t(TEXT_PASSWORD_MISMATCH));
      return;
    }

    setFormError("");

    try {
      const user = await register({ name, email, password });

      if (!user) {
        setFormError(t(TEXT_REGISTER_ERROR));
        return;
      }

      onLoginSuccess?.(user);

      setFormError("");
      resetAndClose();
    } catch (err) {
      setFormError(err.message || t(TEXT_REGISTER_ERROR));
    }
  };

  const renderLeftPanel = () => (
    <View style={authModalStyles.leftPanel}>
      <View>
        <View style={authModalStyles.brandRow}>
          <View style={authModalStyles.brandMark}>
            <Text style={authModalStyles.brandMarkText}>S</Text>
          </View>
          <Text style={authModalStyles.brandText}>
            SieuNhan<Text style={authModalStyles.brandTextAccent}>Gear</Text>
          </Text>
        </View>

        <Text style={authModalStyles.leftTitle}>
          {t(TEXT_WELCOME_TITLE)}{" "}
          <Text style={authModalStyles.leftTitleAccent}>SieuNhanGear</Text>
        </Text>

        <Text style={authModalStyles.leftSubtitle}>
          {t(TEXT_WELCOME_SUBTITLE)}
        </Text>

        <View style={authModalStyles.benefitList}>
          {[
            t(TEXT_BENEFIT_1),
            t(TEXT_BENEFIT_2),
            t(TEXT_BENEFIT_3),
            t(TEXT_BENEFIT_4),
          ].map((item) => (
            <View key={item} style={authModalStyles.benefitItem}>
              <View style={authModalStyles.benefitIcon}>
                <Text style={authModalStyles.benefitIconText}>✓</Text>
              </View>
              <Text style={authModalStyles.benefitText}>{item}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={authModalStyles.leftFooter}>
        <Text style={authModalStyles.leftFooterText}>{t(TEXT_COPYRIGHT)}</Text>
      </View>
    </View>
  );

  const renderCompactHero = () => (
    <View style={authModalStyles.compactHero}>
      <View style={authModalStyles.brandRow}>
        <View style={authModalStyles.brandMark}>
          <Text style={authModalStyles.brandMarkText}>S</Text>
        </View>
        <Text style={authModalStyles.brandText}>
          SieuNhan<Text style={authModalStyles.brandTextAccent}>Gear</Text>
        </Text>
      </View>

      <Text style={authModalStyles.compactHeroTitle}>
        Chào mừng đến{" "}
        <Text style={authModalStyles.leftTitleAccent}>SieuNhanGear</Text>
      </Text>

      <Text style={authModalStyles.compactHeroSubtitle}>
        {t(TEXT_WELCOME_SUBTITLE)}
      </Text>
    </View>
  );

  const renderLoginForm = () => (
    <View style={authModalStyles.form}>
      <View style={authModalStyles.fieldGroup}>
        <View style={authModalStyles.rowBetween}>
          <Text style={authModalStyles.fieldLabel}>Email</Text>
        </View>
        <InputField
          label=""
          leftIcon="📧"
          value={loginForm.email}
          onChangeText={(value) => {
            setFormError("");
            setLoginForm((current) => ({ ...current, email: value }));
          }}
          placeholder="email@example.com"
        />
      </View>

      <View style={authModalStyles.fieldGroup}>
        <View style={authModalStyles.rowBetween}>
          <TextIntl tx={TEXT_PASSWORD} style={authModalStyles.fieldLabel} />
          <Pressable>
            <Text style={authModalStyles.forgotLink}>
              {t(TEXT_FORGOT_PASSWORD)}
            </Text>
          </Pressable>
        </View>
        <InputField
          label=""
          leftIcon="🔑"
          value={loginForm.password}
          onChangeText={(value) => {
            setFormError("");
            setLoginForm((current) => ({ ...current, password: value }));
          }}
          placeholder="••••••••"
          secureTextEntry={!showPassword}
          rightIcon={showPassword ? "👁️" : "🙈"}
          onRightIconPress={() => setShowPassword((v) => !v)}
        />
      </View>

      <Pressable
        style={authModalStyles.rememberRow}
        onPress={() => setRememberMe((value) => !value)}
      >
        <View
          style={[
            authModalStyles.checkbox,
            rememberMe && authModalStyles.checkboxFilled,
          ]}
        >
          {rememberMe ? (
            <Text style={authModalStyles.checkboxMark}>✓</Text>
          ) : null}
        </View>
        <TextIntl
          tx={TEXT_REMEMBER_LOGIN}
          style={authModalStyles.rememberText}
        />
      </Pressable>

      {formError ? (
        <View style={authModalStyles.errorBox}>
          <Text style={authModalStyles.errorBoxIcon}>⚠️</Text>
          <Text style={authModalStyles.formErrorText}>{formError}</Text>
        </View>
      ) : null}

      <Pressable
        style={[
          authModalStyles.submitButton,
          !isLoginFormComplete && authModalStyles.submitButtonDisabled,
        ]}
        onPress={handleLoginSubmit}
        disabled={!isLoginFormComplete}
      >
        <TextIntl tx={TEXT_LOGIN} style={authModalStyles.submitButtonText} />
        <Text style={authModalStyles.submitButtonArrow}>→</Text>
      </Pressable>

      <View style={authModalStyles.footerLinkRow}>
        <Text style={authModalStyles.footerHint}>{t(TEXT_NO_ACCOUNT)}</Text>
        <Pressable onPress={() => handleTabChange(REGISTER)}>
          <Text style={authModalStyles.footerLink}>{t(TEXT_REGISTER_NOW)}</Text>
        </Pressable>
      </View>
    </View>
  );

  const renderRegisterForm = () => (
    <View style={authModalStyles.form}>
      <InputField
        label={t(TEXT_NAME)}
        leftIcon="👤"
        value={registerForm.name}
        onChangeText={(value) => {
          setFormError("");
          setRegisterForm((current) => ({ ...current, name: value }));
        }}
        placeholder={t(TEXT_NAME)}
      />

      <InputField
        label={t(TEXT_EMAIL)}
        leftIcon="📧"
        value={registerForm.email}
        onChangeText={(value) => {
          setFormError("");
          setRegisterForm((current) => ({ ...current, email: value }));
        }}
        placeholder={t(TEXT_EMAIL)}
      />

      <InputField
        label={t(TEXT_PASSWORD)}
        leftIcon="🔑"
        value={registerForm.password}
        onChangeText={(value) => {
          setFormError("");
          setRegisterForm((current) => ({ ...current, password: value }));
        }}
        placeholder={t(TEXT_PASSWORD)}
        secureTextEntry={!showPassword}
        rightIcon={showPassword ? "👁️" : "🙈"}
        onRightIconPress={() => setShowPassword((v) => !v)}
      />

      <InputField
        label={t(TEXT_CONFIRM_PASSWORD)}
        leftIcon="🔒"
        value={registerForm.confirmPassword}
        onChangeText={(value) => {
          setFormError("");
          setRegisterForm((current) => ({
            ...current,
            confirmPassword: value,
          }));
        }}
        placeholder={t(TEXT_CONFIRM_PASSWORD)}
        secureTextEntry={!showConfirmPassword}
        rightIcon={showConfirmPassword ? "👁️" : "🙈"}
        onRightIconPress={() => setShowConfirmPassword((v) => !v)}
      />

      {formError ? (
        <View style={authModalStyles.errorBox}>
          <Text style={authModalStyles.errorBoxIcon}>⚠️</Text>
          <Text style={authModalStyles.formErrorText}>{formError}</Text>
        </View>
      ) : null}

      <Pressable
        style={[
          authModalStyles.submitButton,
          !isRegisterFormComplete && authModalStyles.submitButtonDisabled,
        ]}
        onPress={handleRegisterSubmit}
        disabled={!isRegisterFormComplete}
      >
        <Text style={authModalStyles.submitButtonText}>{t(TEXT_REGISTER)}</Text>
        <Text style={authModalStyles.submitButtonArrow}>→</Text>
      </Pressable>

      <View style={authModalStyles.footerLinkRow}>
        <Text style={authModalStyles.footerHint}>
          {t(TEXT_ALREADY_HAVE_ACCOUNT)}
        </Text>
        <Pressable onPress={() => handleTabChange(LOGIN)}>
          <Text style={authModalStyles.footerLink}>{t(TEXT_LOGIN)}</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={resetAndClose}
    >
      <KeyboardAvoidingView
        style={authModalStyles.overlay}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <Pressable style={authModalStyles.backdrop} onPress={resetAndClose} />
        <View style={cardLayoutStyle}>
          <Pressable
            style={authModalStyles.closeButton}
            onPress={resetAndClose}
          >
            <Text style={authModalStyles.closeButtonText}>×</Text>
          </Pressable>

          {isCompact ? renderCompactHero() : renderLeftPanel()}

          <View style={authModalStyles.rightPanel}>
            <View style={authModalStyles.tabs}>
              <Pressable
                style={[
                  authModalStyles.tabButton,
                  activeTab === LOGIN && authModalStyles.tabButtonActive,
                ]}
                onPress={() => handleTabChange(LOGIN)}
              >
                <Text
                  style={[
                    authModalStyles.tabText,
                    activeTab === LOGIN && authModalStyles.tabTextActive,
                  ]}
                >
                  {t(TEXT_LOGIN)}
                </Text>
              </Pressable>
              <Pressable
                style={[
                  authModalStyles.tabButton,
                  activeTab === REGISTER && authModalStyles.tabButtonActive,
                ]}
                onPress={() => handleTabChange(REGISTER)}
              >
                <Text
                  style={[
                    authModalStyles.tabText,
                    activeTab === REGISTER && authModalStyles.tabTextActive,
                  ]}
                >
                  {t(TEXT_REGISTER)}
                </Text>
              </Pressable>
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 20 }}
            >
              <Text style={authModalStyles.heading}>{title}</Text>
              <Text style={authModalStyles.subtitle}>{subtitle}</Text>

              {activeTab === LOGIN ? renderLoginForm() : renderRegisterForm()}
            </ScrollView>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
