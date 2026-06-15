/*
Copyright (C) 2023-2026 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/
import { api } from '@/lib/api'
import i18next from 'i18next'
import { normalizeInterfaceLanguage } from '@/i18n/languages'
import type { LegalDocumentResponse } from './types'

function legalDocumentRequestConfig() {
  return {
    headers: {
      'Accept-Language': normalizeInterfaceLanguage(i18next.language),
    },
  }
}

export async function getUserAgreement() {
  const res = await api.get<LegalDocumentResponse>(
    '/api/user-agreement',
    legalDocumentRequestConfig()
  )
  return res.data
}

export async function getPrivacyPolicy() {
  const res = await api.get<LegalDocumentResponse>(
    '/api/privacy-policy',
    legalDocumentRequestConfig()
  )
  return res.data
}

export async function getTermsOfService() {
  const res = await api.get<LegalDocumentResponse>(
    '/api/terms-of-service',
    legalDocumentRequestConfig()
  )
  return res.data
}
