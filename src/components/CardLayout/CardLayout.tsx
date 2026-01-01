import { Row } from '../Row/Row';
import { Button } from '../Button/Button';

// --- SeparatorLine Component ---
const SeparatorLine = () => {
  return (
    <div
      style={{
        width: '370px',
        boxSizing: 'border-box',
        gap: '10px',
        paddingTop: '10px',
        paddingBottom: '10px',
        paddingLeft: '15px',
        paddingRight: '15px',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      {/* The visible line itself */}
      <div
        style={{
          width: '340px',
          height: '0.7px',
          backgroundColor: '#CDCDCD',
        }}
      />
    </div>
  );
};

// --- Main CardLayout Component (Frame 8445891) ---
export const CardLayout = () => {
  return (
    // Outermost container (578x794, White BG)
    <div
      style={{
        width: '578px',
        height: '794px',
        backgroundColor: '#FFFFFF',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Montserrat, sans-serif',
      }}
    >
      {/* Inner Card with shadow (Frame 8445888) */}
      <div
        style={{
          width: '370px',
          backgroundColor: '#FFFFFF',
          borderRadius: '6px',
          border: '1px solid #EEEEEE',
          paddingTop: '10px',
          paddingBottom: '10px',
          boxShadow: '0px 8px 15px 0px rgba(20, 20, 20, 0.12), 0px 0px 4px 0px rgba(20, 20, 20, 0.10)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Top Section */}
        <Row label="All pages" textWidth="64px" />
        <SeparatorLine />

        {/* List of Page Rows with specific text widths */}
        <div 
          style={{
            height: `${4 * 42}px`, // Show exactly 4 items
            overflowY: 'auto',
            scrollbarWidth: 'none',
          }}
          className="webkit-scrollbar-none"
        >
          <Row label="Page 1" textWidth="45px" />
          <Row label="Page 2" textWidth="48px" />
          <Row label="Page 3" textWidth="48px" />
          <Row label="Page 4" textWidth="50px" />
          <Row label="Page 5" textWidth="48px" />
          <Row label="Page 6" textWidth="49px" />
        </div>

        {/* Bottom Section */}
        <SeparatorLine />
        {/* Button Container (Frame 8445889) */}
        <div 
          style={{
            width: '370px',
            boxSizing: 'border-box',
            padding: '10px 15px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Button>Done</Button>
        </div>
      </div>
    </div>
  );
};