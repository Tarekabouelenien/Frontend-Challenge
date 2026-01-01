import { useReducer } from 'react';
import type { CSSProperties } from 'react';


// --- Icon Component ---
const Vector128Icon = ({ style, strokeWidth = 1 }: { style?: CSSProperties, strokeWidth?: number }) => (
  <svg viewBox="0 0 15 10" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ ...style, display: style?.visibility === 'hidden' ? 'block' : style?.display }}>
    <path d="M14.5 0.5L10.1 4.9L5.7 9.3L0.5 4.5" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"/>
  </svg>
);
const Vector141Icon = ({ style, strokeWidth = 1 }: { style?: CSSProperties, strokeWidth?: number }) => (
  <svg viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ ...style, display: style?.visibility === 'hidden' ? 'block' : style?.display }}>
    <path d="M0.5 7.1L6.53451 12.4672C6.55497 12.4854 6.58626 12.4837 6.6047 12.4635L17.5 0.5" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"/>
  </svg>
);

export type Variant = 'V1' | 'V2' | 'V3' | 'V4' | 'V5' | 'V6' | 'V7' | 'V8' | 'V8_Final' | 'V9';
type Action = 'MOUSE_ENTER' | 'MOUSE_LEAVE' | 'MOUSE_DOWN' | 'MOUSE_UP' | 'SYNC_VARIANT';

interface CheckboxState {
  variant: Variant;
  isMouseDown: boolean;
  hovered: boolean;
}

const initialState: CheckboxState = {
  variant: 'V1',
  isMouseDown: false,
  hovered: false,
};

function checkboxReducer(state: CheckboxState, action: Action | { type: Action, payload?: Variant }): CheckboxState {
  const type = typeof action === 'string' ? action : action.type;

  const { variant, isMouseDown, hovered } = state;

  // Variant 9 is a terminal state; no transitions allowed.
  if (variant === 'V9' && type !== 'SYNC_VARIANT') return state;

  switch (type) {
    case 'SYNC_VARIANT':
       // Force state update if prop changes 
      return { ...state, variant: (action as any).payload };
    case 'MOUSE_ENTER':
      const nextHovered = { ...state, hovered: true };
      if (variant === 'V1') return { ...nextHovered, variant: 'V2' };
      if (variant === 'V5') return { ...nextHovered, variant: 'V6' };
      if (variant === 'V7') return { ...nextHovered, variant: 'V8_Final' }; // Tracks that we've been to V7
      return nextHovered;

    case 'MOUSE_LEAVE':
      const nextLeft = { ...state, hovered: false, isMouseDown: false };
      if (variant === 'V2' || variant === 'V3') return { ...nextLeft, variant: 'V1' };
      if (variant === 'V4' || variant === 'V6') return { ...nextLeft, variant: 'V5' };
      
      // If we are in the "First" V8 and mouse is down, go to V7.
      if (variant === 'V8' && isMouseDown) return { ...nextLeft, variant: 'V7' };
      // Otherwise, any exit from V8 or V8_Final goes to V9.
      if (variant === 'V8' || variant === 'V8_Final') return { ...nextLeft, variant: 'V9' };
      
      return nextLeft;

    case 'MOUSE_DOWN':
      const nextPressed = { ...state, isMouseDown: true };
      if (variant === 'V2') return { ...nextPressed, variant: 'V3' };
      if (variant === 'V6' && hovered) return { ...nextPressed, variant: 'V8' };
      return nextPressed;

    case 'MOUSE_UP':
      const nextReleased = { ...state, isMouseDown: false };
      if (variant === 'V3') return { ...nextReleased, variant: 'V4' };
      return nextReleased;

    default:
      return state;
  }
}

// --- Props Interface ---
interface CheckboxProps {
  variant?: Variant; 
  style?: CSSProperties; 
  // Deep overrides for specific sub-elements
  overrides?: {
    icon128?: CSSProperties;
    icon141?: CSSProperties;
    border?: CSSProperties;
  };
  // Events
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onMouseDown?: () => void;
  onMouseUp?: () => void;
}

export const Checkbox = ({ variant: controlledVariant, style, overrides, ...props }: CheckboxProps) => {
  const [state, dispatch] = useReducer(checkboxReducer, initialState);

  // Use controlled variant if provided, otherwise internal state
  const currentVariant = controlledVariant ?? state.variant;

  const getVariantStyles = (variant: Variant) => {
    switch (variant) {
        case 'V1':
        return {
          container: { backgroundColor: '#FFFFFF' },
          border: { position: 'absolute' as const, inset: '0px', borderRadius: '6px', border: '1px solid #CDCDCD', opacity: 0.6, zIndex: 10 },
          icon128: {
            position: 'absolute' as const, 
            width: '14px',
            height: '8.8px',
            top: '8px',
            left: '6px',
            color: '#E3E3E3',
            visibility: 'hidden' as const, 
            strokeWidth: 1,
            zIndex: 20,
          },
          glow: { display: 'none' as const }, 
          background: { display: 'none' as const }, 
          icon141: { display: 'none' as const }, 
        };
        case 'V2':
        return {
          container: { backgroundColor: '#FFFFFF' },
          border: { position: 'absolute' as const, inset: '0px', borderRadius: '6px', border: '1px solid #BDBDBD', zIndex: 10 },
          icon128: {
            position: 'absolute' as const,
            width: '14px',
            height: '8.8px',
            top: '8px',
            left: '6px',
            color: '#E3E3E3',
            visibility: 'hidden' as const,
            strokeWidth: 1,
            zIndex: 0,
          },
          icon141: {
            position: 'absolute' as const,
            width: '17px',
            height: '12px',
            top: '6px',
            left: '4px',
            color: '#E3E3E3',
            strokeWidth: 1,
            zIndex: 20,
          },
          glow: { display: 'none' as const },
          background: { display: 'none' as const },
        };
        case 'V3':
        return {
          container: {},
          border: { 
            position: 'absolute' as const, 
            inset: '0px', borderRadius: '6px', 
            border: '1px solid #BDBDBD', 
            zIndex: 20 
          },
          glow: { 
            position: 'absolute' as const, 
            inset: '0px', 
            borderRadius: '6px', 
            boxShadow: '0 0 0 3px #2469F6', 
            opacity: 0.1, 
            zIndex: 10 
          },
          icon128: {
            position: 'absolute' as const,
            width: '14px',
            height: '8.8px',
            top: '8px',
            left: '6px',
            color: '#E3E3E3',
            visibility: 'hidden' as const,
            strokeWidth: 1,
            zIndex: 0,
          },
          icon141: {
            position: 'absolute' as const,
            width: '17px',
            height: '12px',
            top: '6px',
            left: '4px',
            color: '#878787',
            strokeWidth: 1,
            zIndex: 30,
          },
          background: { display: 'none' as const },
        };
        case 'V4':
        return {
          container: {},
          background: {
            position: 'absolute' as const,
            inset: '0px',
            borderRadius: '6px',
            backgroundColor: '#5087F8',
            zIndex: 10,
          },
          icon128: {
            position: 'absolute' as const,
            width: '14px',
            height: '8.8px',
            top: '8px',
            left: '6px',
            color: '#E3E3E3',
            visibility: 'hidden' as const,
            strokeWidth: 1,
            zIndex: 0,
          },
          icon141: {
            position: 'absolute' as const,
            width: '17px',
            height: '12px',
            top: '6px',
            left: '4px',
            color: '#FFFFFF',
            strokeWidth: 1,
            zIndex: 20,
          },
          border: { display: 'none' as const },
          glow: { display: 'none' as const },
        };
        case 'V5':
        return {
          container: {},
          background: { 
            position: 'absolute' as const,
            inset: '0px',
            borderRadius: '6px',
            backgroundColor: '#2469F6',
            zIndex: 10,
          },
          icon128: {
            position: 'absolute' as const,
            width: '14px',
            height: '8.8px',
            top: '8px',
            left: '6px',
            color: '#E3E3E3',
            visibility: 'hidden' as const,
            strokeWidth: 1,
            zIndex: 0,
          },
          icon141: {
            position: 'absolute' as const,
            width: '17px',
            height: '12px',
            top: '6px',
            left: '4px',
            color: '#FFFFFF',
            strokeWidth: 1,
            zIndex: 20,
          },
          border: { display: 'none' as const },
          glow: { display: 'none' as const },
        };
        case 'V6':
        return {
          container: {},
          background: { 
            position: 'absolute' as const,
            inset: '0px',
            borderRadius: '6px',
            backgroundColor: '#5087F8',
            zIndex: 10,
          },
          icon128: {
            position: 'absolute' as const,
            width: '14px',
            height: '8.8px',
            top: '8px',
            left: '6px',
            color: '#E3E3E3',
            visibility: 'hidden' as const,
            strokeWidth: 1,
            zIndex: 0,
          },
          icon141: {
            position: 'absolute' as const,
            width: '17px',
            height: '12px',
            top: '6px',
            left: '4px',
            color: '#FFFFFF',
            strokeWidth: 1,
            zIndex: 20,
          },
          border: { display: 'none' as const },
          glow: { display: 'none' as const },
        };
        case 'V7':
        return {
          container: {},
          background: {
            position: 'absolute' as const,
            inset: '0px',
            borderRadius: '6px',
            backgroundColor: '#2469F6',
            zIndex: 20,
          },
          glow: {
            position: 'absolute' as const,
            inset: '0px',
            borderRadius: '6px',
            boxShadow: '0 0 0 3px #2469F6',
            opacity: 0.1,
            zIndex: 10,
          },
          icon128: {
            position: 'absolute' as const,
            width: '14px',
            height: '8.8px',
            top: '8px',
            left: '6px',
            color: '#E3E3E3',
            visibility: 'hidden' as const,
            strokeWidth: 1,
            zIndex: 0,
          },
          icon141: {
            position: 'absolute' as const,
            width: '17px',
            height: '12px',
            top: '6px',
            left: '4px',
            color: '#FFFFFF',
            strokeWidth: 1,
            zIndex: 30,
          },
          border: { display: 'none' as const },
        };
        case 'V8':
        case 'V8_Final':
        return {
          container: {
            backgroundColor: '#FFFFFF',
          },
          border: {
            position: 'absolute' as const,
            inset: '0px',
            borderRadius: '6px',
            border: '1px solid #BDBDBD',
            zIndex: 10,
          },
          icon141: {
            position: 'absolute' as const,
            width: '17px',
            height: '12px',
            top: '6px',
            left: '4px',
            color: '#E3E3E3',
            strokeWidth: 1,
            zIndex: 20,
          },
          icon128: { display: 'none' as const },
          glow: { display: 'none' as const },
          background: { display: 'none' as const },
        };
        case 'V9':
        return {
          container: {
            backgroundColor: '#FFFFFF',
            cursor: 'default' as const,
          },
          border: {
            position: 'absolute' as const,
            inset: '0px',
            borderRadius: '6px',
            border: '1px solid #CDCDCD',
            zIndex: 10,
          },
          icon128: { display: 'none' as const },
          icon141: { display: 'none' as const },
          glow: { display: 'none' as const },
          background: { display: 'none' as const },
        };
      default:
        return { container: {}, border: {}, glow: {}, background: {}, icon128: {}, icon141: {} };
    }
  };

  const styles = getVariantStyles(currentVariant);

  // MERGE STYLES: Default < Variant < Props Overrides
  const containerStyle = { ...styles.container, ...style };
  const borderStyle = { ...styles.border, ...overrides?.border };
  const icon128Style = { ...styles.icon128, ...overrides?.icon128 };
  const icon141Style = { ...styles.icon141, ...overrides?.icon141 };

  const handleMouseEnter = () => {
    if (!controlledVariant) dispatch('MOUSE_ENTER');
    props.onMouseEnter?.();
  };
  const handleMouseLeave = () => {
    if (!controlledVariant) dispatch('MOUSE_LEAVE');
    props.onMouseLeave?.();
  };
  const handleMouseDown = () => {
    if (!controlledVariant) dispatch('MOUSE_DOWN');
    props.onMouseDown?.();
  };
  const handleMouseUp = () => {
    if (!controlledVariant) dispatch('MOUSE_UP');
    props.onMouseUp?.();
  };

  return (
    <button
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      style={{
        position: 'relative',
        width: '25px',
        height: '25px',
        borderRadius: '6px',
        backgroundColor: '#FFFFFF',
        border: 'none',
        padding: 0,
        cursor: 'pointer',
        ...containerStyle,
      }}
    >
      <div style={{ ...styles.glow, pointerEvents: 'none' }} />
      <div style={{ ...styles.background, pointerEvents: 'none' }} />
      <div style={{ ...borderStyle, pointerEvents: 'none' }} />
      {/* We apply overrides here to potentially un-hide icon128 */}
      <Vector128Icon style={icon128Style} strokeWidth={icon128Style?.strokeWidth as number} />
      <Vector141Icon style={icon141Style} strokeWidth={icon141Style?.strokeWidth as number} />
    </button>
  );
};
