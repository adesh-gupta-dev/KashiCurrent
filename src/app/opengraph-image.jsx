import { ImageResponse } from 'next/og';

export const alt = 'KashiCurrent premium electrician marketplace';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background:
            'radial-gradient(circle at top left, rgba(194,101,42,0.35), transparent 28%), linear-gradient(135deg, #fff8f3 0%, #f6ede6 100%)',
          padding: '64px',
          color: '#23170f',
        }}
      >
        <div
          style={{
            display: 'flex',
            width: '110px',
            height: '110px',
            borderRadius: '28px',
            background: '#c2652a',
            color: 'white',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '44px',
          }}
        >
          KC
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div style={{ fontSize: '70px', fontWeight: 700 }}>KashiCurrent</div>
          <div style={{ fontSize: '32px', maxWidth: '860px' }}>
            Premium electrician booking for homeowners, verified professionals, and modern platform operations.
          </div>
        </div>
      </div>
    ),
    size
  );
}
