import { DotLoader } from 'react-spinners'

export function Loading() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        width: '100%',
        height: '100%',
      }}
    >
      <DotLoader color="#fff" />
    </div>
  )
}
