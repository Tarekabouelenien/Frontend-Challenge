import { useReducer } from 'react';
import { Checkbox, type Variant as CheckboxVariant } from '../Checkbox/Checkbox'; 

// --- Types ---
type RowVariant = 'V1' | 'V2' | 'V3' | 'V4' | 'V5' | 'V6' | 'V7' | 'V8';
type Action = 'MOUSE_ENTER' | 'MOUSE_LEAVE' | 'MOUSE_DOWN' | 'MOUSE_UP';

interface RowState {
  variant: RowVariant;
  isMouseDown: boolean;
}

interface RowProps {
  label?: string;
  initialChecked?: boolean;
  textWidth?: string;
}

// --- Reducer (The Transition Engine) ---
function rowReducer(state: RowState, action: Action): RowState {
  const { variant } = state;

  switch (action) {
    case 'MOUSE_ENTER':
      if (variant === 'V1') return { ...state, variant: 'V2' };
      if (variant === 'V5') return { ...state, variant: 'V6' };
      if (variant === 'V7') return { ...state, variant: 'V8' }; 
      return state;

    case 'MOUSE_LEAVE':
      const nextLeft = { ...state, isMouseDown: false };
      if (variant === 'V3') return { ...nextLeft, variant: 'V1' };
      if (variant === 'V7') return { ...nextLeft, variant: 'V5' };
      if (variant === 'V2') return { ...nextLeft, variant: 'V1' }; 
      if (variant === 'V4') return { ...nextLeft, variant: 'V5' }; 
      if (variant === 'V6') return { ...nextLeft, variant: 'V5' }; 
      if (variant === 'V8') return { ...nextLeft, variant: 'V1' }; 
      return nextLeft;

    case 'MOUSE_DOWN':
      const nextPressed = { ...state, isMouseDown: true };
      if (variant === 'V2') return { ...nextPressed, variant: 'V3' };
      if (variant === 'V6') return { ...nextPressed, variant: 'V7' };
      return nextPressed;

    case 'MOUSE_UP':
      const nextReleased = { ...state, isMouseDown: false };
      if (variant === 'V3') return { ...nextReleased, variant: 'V4' };
      if (variant === 'V7') return { ...nextReleased, variant: 'V8' };
      return nextReleased;

    default:
      return state;
  }
}

export const Row = ({ label = "All pages", initialChecked = false, textWidth }: RowProps) => {
  const [state, dispatch] = useReducer(rowReducer, {
    variant: initialChecked ? 'V5' : 'V1',
    isMouseDown: false
  });

  const handleMouseEnter = () => dispatch('MOUSE_ENTER');
  const handleMouseLeave = () => dispatch('MOUSE_LEAVE');
  const handleMouseDown = () => dispatch('MOUSE_DOWN');
  const handleMouseUp = () => dispatch('MOUSE_UP');

  // --- Styles Logic ---
  const getVariantStyles = () => {
    switch (state.variant) {
      // --- VARIANT 1: DEFAULT ---
      case 'V1':
        return {
          container: {},
          text: { color: '#1F2128' },
          checkboxVariant: 'V1' as CheckboxVariant,
          checkboxOverrides: {}
        };

      // --- VARIANT 2: HOVER ---
      case 'V2':
        return {
          container: {},
          text: { color: '#1F2128' },
          checkboxVariant: 'V2' as CheckboxVariant,
          checkboxOverrides: {
             icon141: { 
               visibility: 'visible' as const,
               width: '15.64px',
               height: '11.04px',
               top: '5.52px',
               left: '3.68px',
               strokeWidth: 1,
               color: '#E3E3E3'
             }
          }
        };
      // --- VARIANT 3: PRESSING ---
      case 'V3':
        return {
          container: {},
          text: { color: '#1F2128' },
          checkboxVariant: 'V3' as CheckboxVariant,
          checkboxOverrides: {
             icon141: { 
               visibility: 'visible' as const,
               width: '15.64px',
               height: '11.04px',
               top: '5.52px',
               left: '3.68px',
               strokeWidth: 1,
               color: '#878787' 
             }
          }
        };
      // --- VARIANT 4: SELECTED ---
      case 'V4':
        return {
          container: {},
          text: { 
            color: '#1F2128' 
          },
          checkboxVariant: 'V4' as CheckboxVariant,
          checkboxOverrides: {
             icon141: { 
               visibility: 'visible' as const,
               width: '15.64px',
               height: '11.04px',
               top: '5.52px',
               left: '3.68px',
               strokeWidth: 1,
               color: '#FFFFFF'
             }
          }
        };
      // --- VARIANT 5: CHECKED IDLE ---
      case 'V5':
        return {
          container: {},
          text: { 
            color: '#1F2128' 
          },
          checkboxVariant: 'V5' as CheckboxVariant,
          checkboxOverrides: {
             icon141: { 
               visibility: 'visible' as const,
               width: '15.64px',
               height: '11.04px',
               top: '5.52px',
               left: '3.68px',
               strokeWidth: 1,
               color: '#FFFFFF'
             }
          }
        };
     // --- VARIANT 6: HOVER CHECKED ---
     case 'V6':
        return {
          container: {},
          text: { 
            color: '#1F2128' 
          },
          checkboxVariant: 'V6' as CheckboxVariant,
          checkboxOverrides: {
             icon141: { 
               visibility: 'visible' as const,
               width: '15.64px',
               height: '11.04px',
               top: '5.52px',
               left: '3.68px',
               strokeWidth: 1,
               color: '#FFFFFF'
             }
          }
        };
      // --- VARIANT 7: PRESSING UNCHECK ---
      case 'V7':
        return {
          container: {},
          text: { 
            color: '#1F2128' 
          },
          checkboxVariant: 'V7' as CheckboxVariant,
          checkboxOverrides: {
             icon141: { 
               visibility: 'visible' as const,
               width: '15.64px',
               height: '11.04px',
               top: '5.52px',
               left: '3.68px',
               strokeWidth: 1,
               color: '#FFFFFF'
             }
          }
        };
      // --- VARIANT 8: UNCHECK HOVER ---
      case 'V8':
        return {
          container: {},
          text: { 
            color: '#1F2128' 
          },
          checkboxVariant: 'V8_Final' as CheckboxVariant,
          checkboxOverrides: {
             icon141: { 
                visibility: 'visible' as const,
                width: '15.64px', 
                height: '11.04px', 
                top: '5.52px', 
                left: '3.68px', 
                strokeWidth: 1,
                color: '#E3E3E3'
             }
          }
        };
      default:
        return { container: {}, text: {}, checkboxVariant: 'V1' as CheckboxVariant, checkboxOverrides: {} };
    }
  };

  const styles = getVariantStyles();

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      style={{
        width: '370px',
        height: '42px',
        boxSizing: 'border-box',
        
        paddingTop: '8px',
        paddingRight: '15px',
        paddingBottom: '8px',
        paddingLeft: '22px',

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: 'pointer',
        userSelect: 'none',
        transition: 'none',
        
        fontFamily: 'Montserrat, sans-serif',
        fontSize: '14px',
        lineHeight: '1.3',
        
        ...styles.container,
      }}
    >
      <span style={{ ...styles.text, width: textWidth, flexShrink: 0 }}>{label}</span>
      
      <Checkbox 
        variant={styles.checkboxVariant} 
        style={{
          width: '23px',  
          height: '23px',
          flexShrink: 0,
        }}
        overrides={styles.checkboxOverrides}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      />
    </div>
  );
};