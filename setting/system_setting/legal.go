package system_setting

import "github.com/QuantumNous/new-api/setting/config"

type LegalSettings struct {
	UserAgreement    string `json:"user_agreement"`
	UserAgreementEn  string `json:"user_agreement_en"`
	PrivacyPolicy    string `json:"privacy_policy"`
	PrivacyPolicyEn  string `json:"privacy_policy_en"`
	TermsOfService   string `json:"terms_of_service"`
	TermsOfServiceEn string `json:"terms_of_service_en"`
}

var defaultLegalSettings = LegalSettings{
	UserAgreement:    "",
	UserAgreementEn:  "",
	PrivacyPolicy:    "",
	PrivacyPolicyEn:  "",
	TermsOfService:   "",
	TermsOfServiceEn: "",
}

func init() {
	config.GlobalConfig.Register("legal", &defaultLegalSettings)
}

func GetLegalSettings() *LegalSettings {
	return &defaultLegalSettings
}
