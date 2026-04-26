export default function StatusBar({ current, minimum, maximum }) {

  const currentValue = Number(current)|| 0;
  const minimumValue = Number(minimum) || 0;
  const maximumValue = Number(maximum) || 100;

  const percentage = maximumValue > 0 ? Math.min((currentValue / maximumValue) * 100, 100) : 0;
  const isLow = minimumValue > 0 && currentValue <= minimumValue;
  const isCritical = minimumValue > 0 && currentValue <= minimumValue * 0.5;

  const getColor = () => {
    if (isCritical) return '#e74c3c';
    if (isLow) return '#f39c12'; 
    return '#27ae60';
  };

  const getStatusText = () => {
    if (isCritical) return 'Crítico';
    if (isLow) return 'Bajo';
    return 'Disponible';
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%' }}>
      <div style={{ flex: 1 }}>
        <div
          style={{
            width: '100%',
            height: '12px',
            background: '#e8ddd3',
            borderRadius: '6px',
            overflow: 'hidden',
            boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.1)',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${percentage}%`,
              background: getColor(),
              transition: 'width 0.3s ease, background-color 0.3s ease',
              borderRadius: '6px',
            }}
          />
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: '80px' }}>
        <span style={{ fontSize: '12px', fontWeight: '600', color: '#666', minWidth: '30px' }}>
          {Math.round(percentage)}%
        </span>
        {isCritical && <span style={{ fontSize: '14px' }}>⚠️</span>}
      </div>
    </div>
  );
}
