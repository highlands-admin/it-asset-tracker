export type AssetFormState = {
  status: 'idle' | 'error'
  message?: string
  fieldErrors?: Record<string, string[]>
}

export const initialAssetFormState: AssetFormState = { status: 'idle' }
