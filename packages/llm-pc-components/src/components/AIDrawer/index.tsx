import { CloseOutlined } from "@ant-design/icons";
import React, { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AIContainer, AIContainerProps } from "../../core/AIContainer";
import styles from "./style.module.less";

/**
 * AIDrawer
 *
 * A high-order AI component (HOC) that:
 * - Provides AI capabilities to its children via `AIContainer` (see `useAI()`)
 * - Renders content in a drawer-like container similar to antd Drawer
 *
 * Design goal in this repo:
 * - `components/` hosts AI HOCs (AIDrawer, future AIInput, ...)
 * - `core/` hosts shared capability providers (AIContainer, ...)
 *
 * Note:
 * The Drawer implementation is intentionally embedded here so that AIDrawer is
 * self-contained and does not expose `Drawer` as a separate public surface.
 */

export type DrawerPlacement = "top" | "right" | "bottom" | "left";

export interface DrawerProps {
  /** Controls drawer visibility. */
  open?: boolean;

  /** Optional header title. If `null`/`undefined` and `closable=false`, header is hidden. */
  title?: ReactNode;

  /** Drawer slide-in direction. Defaults to `right`. */
  placement?: DrawerPlacement;

  /** Width for left/right drawers. */
  width?: string | number;

  /** Height for top/bottom drawers. */
  height?: string | number;

  /** Close callback (mask click / close button). */
  onClose?: () => void;

  /** Drawer body content. */
  children?: ReactNode;

  /** Extra className applied to outer wrapper. */
  className?: string;

  /** Inline styles for outer wrapper. */
  style?: React.CSSProperties;

  /** Whether to render mask overlay. */
  mask?: boolean;

  /** Click mask to close. */
  maskClosable?: boolean;

  /** Unmount drawer when closed. */
  destroyOnClose?: boolean;

  /** Whether to show close button in header. */
  closable?: boolean;

  /** Inline styles for the sliding panel element. */
  drawerStyle?: React.CSSProperties;

  /** Inline styles for header container. */
  headerStyle?: React.CSSProperties;

  /** Inline styles for body container. */
  bodyStyle?: React.CSSProperties;
}

const Drawer: React.FC<DrawerProps> = ({
  open = false,
  title,
  placement = "right",
  width = 378,
  height = 378,
  onClose,
  children,
  className = "",
  style,
  mask = true,
  maskClosable = true,
  destroyOnClose = false,
  closable = true,
  drawerStyle: customDrawerStyle,
  headerStyle,
  bodyStyle
}) => {
  const [visible, setVisible] = useState(open);
  const [rendered, setRendered] = useState(open);

  useEffect(() => {
    if (open) {
      // Mount first, then apply the `.open` class on the next paint(s)
      // so CSS transitions can run reliably.
      setRendered(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setVisible(true);
        });
      });
    } else {
      // Trigger closing animation by removing `.open` class,
      // then unmount after transition ends.
      setVisible(false);
      const timer = setTimeout(() => {
        setRendered(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [open]);

  // If the consumer wants destroy-on-close, stop rendering after close animation.
  if (!rendered && destroyOnClose) return null;

  const handleClose = () => {
    onClose?.();
  };

  const handleMaskClick = () => {
    if (maskClosable) {
      handleClose();
    }
  };

  const contentStyle: React.CSSProperties = {
    // Apply styles specifically to the sliding panel.
    ...customDrawerStyle
  };

  if (placement === "left" || placement === "right") {
    contentStyle.width = width;
  } else {
    contentStyle.height = height;
  }

  const content = (
    <div
      className={`${styles.drawer} ${visible ? styles.open : ""} ${styles[placement]} ${className}`}
      style={{ zIndex: 1000, ...style }}
    >
      {/* Mask sits under the panel; click-to-close is controlled by maskClosable */}
      {mask && <div className={styles.mask} onClick={handleMaskClick} />}
      <div className={styles.content} style={contentStyle}>
        {(title || closable) && (
          <div className={styles.header} style={headerStyle}>
            <div className={styles.title}>{title}</div>
            {closable && (
              // Close button mirrors antd Drawer behavior.
              <button className={styles.close} onClick={handleClose}>
                <CloseOutlined />
              </button>
            )}
          </div>
        )}
        {/* Body scrolls when content exceeds panel height */}
        <div className={styles.body} style={bodyStyle}>
          {children}
        </div>
      </div>
    </div>
  );

  return createPortal(content, document.body);
};

// --- AIDrawer (AI HOC) ---

export interface AIDrawerProps extends DrawerProps, AIContainerProps {}

export const AIDrawer: React.FC<AIDrawerProps> = ({ children, onSendMessage, mockResponse, ...drawerProps }) => {
  return (
    // Provide AI capability to any descendant of the drawer.
    <AIContainer onSendMessage={onSendMessage} mockResponse={mockResponse}>
      <Drawer {...drawerProps}>{children}</Drawer>
    </AIContainer>
  );
};
