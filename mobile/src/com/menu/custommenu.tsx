// // components/ui/Menu/index.tsx
// import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
// import {
//   View,
//   Text,
//   Modal,
//   TouchableWithoutFeedback,
//   TouchableOpacity,
//   StyleSheet,
//   Animated,
//   Dimensions,
//   FlatList,
//   ScrollView,
// } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';

// // Menu Context
// interface MenuContextType {
//   isOpen: boolean;
//   setIsOpen: (open: boolean) => void;
//   closeMenu: () => void;
// }

// const MenuContext = createContext<MenuContextType | undefined>(undefined);

// const useMenuContext = () => {
//   const context = useContext(MenuContext);
//   if (!context) {
//     throw new Error('Menu components must be used within a Menu.Root');
//   }
//   return context;
// };

// // Menu Root Component
// interface MenuRootProps {
//   children: React.ReactNode;
//   open?: boolean;
//   onOpenChange?: (open: boolean) => void;
// }

// const MenuRoot: React.FC<MenuRootProps> = ({ children, open, onOpenChange }) => {
//   const [internalOpen, setInternalOpen] = useState(false);

//   const isControlled = open !== undefined;
//   const isOpen = isControlled ? open : internalOpen;

//   const setIsOpen = (value: boolean) => {
//     if (!isControlled) {
//       setInternalOpen(value);
//     }
//     onOpenChange?.(value);
//   };

//   const closeMenu = () => setIsOpen(false);

//   return (
//     <MenuContext.Provider value={{ isOpen, setIsOpen, closeMenu }}>
//       {children}
//     </MenuContext.Provider>
//   );
// };

// // Menu Trigger Component
// interface MenuTriggerProps {
//   children: React.ReactNode;
//   asChild?: boolean;
//   style?: any;
// }

// const MenuTrigger: React.FC<MenuTriggerProps> = ({ children, asChild, style }) => {
//   const { setIsOpen, isOpen } = useMenuContext();

//   const handlePress = () => {
//     setIsOpen(!isOpen);
//   };

//   if (asChild && React.isValidElement(children)) {
//     return React.cloneElement(children, {
//       onPress: handlePress,
//     });
//   }

//   return (
//     <TouchableOpacity onPress={handlePress} style={style}>
//       {children}
//     </TouchableOpacity>
//   );
// };

// // Menu Content Component
// interface MenuContentProps {
//   children: React.ReactNode;
//   align?: 'start' | 'center' | 'end';
//   side?: 'top' | 'bottom';
//   sideOffset?: number;
//   width?: number | string;
//   maxHeight?: number;
// }

// const MenuContent: React.FC<MenuContentProps> = ({
//   children,
//   align = 'start',
//   side = 'bottom',
//   sideOffset = 4,
//   width = 200,
//   maxHeight = 300,
// }) => {
//   const { isOpen, closeMenu } = useMenuContext();
//   const [triggerLayout, setTriggerLayout] = useState<any>(null);
//   const triggerRef = useRef<View>(null);
//   const fadeAnim = useRef(new Animated.Value(0)).current;
//   const scaleAnim = useRef(new Animated.Value(0.95)).current;
//   const insets = useSafeAreaInsets();

//   useEffect(() => {
//     if (isOpen && triggerRef.current) {
//       triggerRef.current.measure((x, y, width, height, pageX, pageY) => {
//         setTriggerLayout({ x: pageX, y: pageY, width, height });
//       });

//       Animated.parallel([
//         Animated.timing(fadeAnim, {
//           toValue: 1,
//           duration: 200,
//           useNativeDriver: true,
//         }),
//         Animated.spring(scaleAnim, {
//           toValue: 1,
//           friction: 8,
//           tension: 40,
//           useNativeDriver: true,
//         }),
//       ]).start();
//     } else {
//       Animated.timing(fadeAnim, {
//         toValue: 0,
//         duration: 150,
//         useNativeDriver: true,
//       }).start();
//     }
//   }, [isOpen]);

//   const getContentPosition = () => {
//     if (!triggerLayout) return {};

//     const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
//     let left = triggerLayout.x;
//     let top = side === 'bottom'
//       ? triggerLayout.y + triggerLayout.height + sideOffset
//       : triggerLayout.y - maxHeight - sideOffset;

//     // Handle alignment
//     if (align === 'center') {
//       left = triggerLayout.x + (triggerLayout.width / 2) - (Number(width) / 2);
//     } else if (align === 'end') {
//       left = triggerLayout.x + triggerLayout.width - Number(width);
//     }

//     // Prevent menu from going off screen
//     left = Math.max(8, Math.min(left, screenWidth - Number(width) - 8));

//     // Prevent menu from going off screen vertically
//     if (side === 'bottom' && top + maxHeight > screenHeight - insets.bottom) {
//       top = triggerLayout.y - maxHeight - sideOffset;
//     } else if (side === 'top' && top < insets.top) {
//       top = triggerLayout.y + triggerLayout.height + sideOffset;
//     }

//     return { left, top };
//   };

//   if (!isOpen) return null;

//   const position = getContentPosition();

//   return (
//     <Modal
//       transparent
//       visible={isOpen}
//       animationType="none"
//       onRequestClose={closeMenu}
//     >
//       <TouchableWithoutFeedback onPress={closeMenu}>
//         <View style={styles.overlay} />
//       </TouchableWithoutFeedback>

//       <Animated.View
//         ref={triggerRef}
//         style={[
//           styles.content,
//           {
//             position: 'absolute',
//             left: position.left,
//             top: position.top,
//             width: width,
//             maxHeight: maxHeight,
//             opacity: fadeAnim,
//             transform: [{ scale: scaleAnim }],
//           },
//         ]}
//       >
//         <ScrollView
//           showsVerticalScrollIndicator={false}
//           bounces={false}
//         >
//           {children}
//         </ScrollView>
//       </Animated.View>
//     </Modal>
//   );
// };

// // Menu Item Component
// interface MenuItemProps {
//   children: React.ReactNode;
//   onPress?: () => void;
//   disabled?: boolean;
//   destructive?: boolean;
//   icon?: React.ReactNode;
//   rightIcon?: React.ReactNode;
//   style?: any;
//   textStyle?: any;
// }

// const MenuItem: React.FC<MenuItemProps> = ({
//   children,
//   onPress,
//   disabled = false,
//   destructive = false,
//   icon,
//   rightIcon,
//   style,
//   textStyle,
// }) => {
//   const { closeMenu } = useMenuContext();

//   const handlePress = () => {
//     if (disabled) return;
//     onPress?.();
//     closeMenu();
//   };

//   const getTextColor = () => {
//     if (disabled) return '#9CA3AF';
//     if (destructive) return '#EF4444';
//     return '#1F2937';
//   };

//   return (
//     <TouchableOpacity
//       onPress={handlePress}
//       disabled={disabled}
//       style={[
//         styles.menuItem,
//         disabled && styles.menuItemDisabled,
//         style,
//       ]}
//       activeOpacity={0.7}
//     >
//       <View style={styles.menuItemContent}>
//         {icon && <View style={styles.menuItemIcon}>{icon}</View>}
//         <Text
//           style={[
//             styles.menuItemText,
//             { color: getTextColor() },
//             textStyle,
//           ]}
//         >
//           {children}
//         </Text>
//         {rightIcon && <View style={styles.menuItemRightIcon}>{rightIcon}</View>}
//       </View>
//     </TouchableOpacity>
//   );
// };

// // Menu Separator Component
// const MenuSeparator: React.FC = () => {
//   return <View style={styles.separator} />;
// };

// // Menu Group Component
// interface MenuGroupProps {
//   children: React.ReactNode;
//   title?: string;
// }

// const MenuGroup: React.FC<MenuGroupProps> = ({ children, title }) => {
//   return (
//     <View style={styles.group}>
//       {title && (
//         <Text style={styles.groupTitle}>{title}</Text>
//       )}
//       {children}
//     </View>
//   );
// };

// // Menu Sub Component
// interface MenuSubProps {
//   children: React.ReactNode;
//   title: string;
//   icon?: React.ReactNode;
// }

// const MenuSub: React.FC<MenuSubProps> = ({ children, title, icon }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <View>
//       <TouchableOpacity
//         onPress={() => setIsOpen(!isOpen)}
//         style={styles.menuItem}
//       >
//         <View style={styles.menuItemContent}>
//           {icon && <View style={styles.menuItemIcon}>{icon}</View>}
//           <Text style={styles.menuItemText}>{title}</Text>
//           <View style={styles.menuItemRightIcon}>
//             <Text style={styles.subMenuArrow}>{isOpen ? '▼' : '▶'}</Text>
//           </View>
//         </View>
//       </TouchableOpacity>
//       {isOpen && (
//         <View style={styles.subMenuContent}>
//           {children}
//         </View>
//       )}
//     </View>
//   );
// };

// // Styles
// const styles = StyleSheet.create({
//   overlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.4)',
//   },
//   content: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 8,
//     paddingVertical: 8,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   menuItem: {
//     paddingVertical: 10,
//     paddingHorizontal: 16,
//   },
//   menuItemDisabled: {
//     opacity: 0.5,
//   },
//   menuItemContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   menuItemIcon: {
//     marginRight: 12,
//     width: 20,
//     alignItems: 'center',
//   },
//   menuItemRightIcon: {
//     marginLeft: 'auto',
//     paddingLeft: 12,
//   },
//   menuItemText: {
//     fontSize: 14,
//     fontWeight: '400',
//     flex: 1,
//   },
//   separator: {
//     height: 1,
//     backgroundColor: '#E5E7EB',
//     marginVertical: 8,
//   },
//   group: {
//     marginVertical: 4,
//   },
//   groupTitle: {
//     fontSize: 12,
//     fontWeight: '600',
//     color: '#6B7280',
//     paddingVertical: 6,
//     paddingHorizontal: 16,
//     textTransform: 'uppercase',
//     letterSpacing: 0.5,
//   },
//   subMenuContent: {
//     paddingLeft: 16,
//   },
//   subMenuArrow: {
//     fontSize: 12,
//     color: '#6B7280',
//   },
// });

// // Export compound component
// export const Menu = {
//   Root: MenuRoot,
//   Trigger: MenuTrigger,
//   Content: MenuContent,
//   Item: MenuItem,
//   Separator: MenuSeparator,
//   Group: MenuGroup,
//   Sub: MenuSub,
// };

// components/ui/Menu/index.tsx
import { CheckCircle, CircleArrowRight } from '@tamagui/lucide-icons';
import colors from 'mobile/constant/colors';
import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  ScrollView,
  LayoutChangeEvent,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface MenuContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  closeMenu: () => void;
  triggerRef: React.RefObject<View>;
  onTriggerLayout: (event: LayoutChangeEvent) => void;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

const useMenuContext = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('Menu components must be used within a Menu.Root');
  }
  return context;
};

// Menu Root Component
interface MenuRootProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const MenuRoot: React.FC<MenuRootProps> = ({
  children,
  open,
  onOpenChange,
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const [triggerLayout, setTriggerLayout] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
    pageX: number;
    pageY: number;
  } | null>(null);

  const triggerRef = useRef<View>(null);

  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;

  const setIsOpen = (value: boolean) => {
    if (!isControlled) {
      setInternalOpen(value);
    }
    onOpenChange?.(value);
  };

  const closeMenu = () => setIsOpen(false);

  const onTriggerLayout = (event: LayoutChangeEvent) => {
    if (triggerRef.current) {
      triggerRef.current.measure((x, y, width, height, pageX, pageY) => {
        setTriggerLayout({ x, y, width, height, pageX, pageY });
      });
    }
  };

  return (
    <MenuContext.Provider
      value={{
        isOpen,
        setIsOpen,
        closeMenu,
        triggerRef,
        onTriggerLayout,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

// Menu Trigger Component
interface MenuTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
  style?: any;
}

const MenuTrigger: React.FC<MenuTriggerProps> = ({
  children,
  asChild,
  style,
}) => {
  const { setIsOpen, isOpen, triggerRef, onTriggerLayout } = useMenuContext();

  const handlePress = () => {
    setIsOpen(!isOpen);
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      onPress: handlePress,
      ref: triggerRef,
      onLayout: onTriggerLayout,
    });
  }

  return (
    <TouchableOpacity
      ref={triggerRef}
      onPress={handlePress}
      onLayout={onTriggerLayout}
      style={style}
      activeOpacity={0.7}
    >
      {children}
    </TouchableOpacity>
  );
};

// Menu Content Component
interface MenuContentProps {
  children: React.ReactNode;
  align?: 'start' | 'center' | 'end';
  side?: 'top' | 'bottom' | 'left' | 'right';
  sideOffset?: number;
  alignOffset?: number;
  width?: number | string;
  maxHeight?: number;
  style?: any;
}

const MenuContent: React.FC<MenuContentProps> = ({
  children,
  align = 'start',
  side = 'bottom',
  sideOffset = 5,
  alignOffset = 0,
  width = 200,
  maxHeight = 300,
  style,
}) => {
  const { isOpen, closeMenu, triggerRef } = useMenuContext();
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [isPositioned, setIsPositioned] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const insets = useSafeAreaInsets();
  const menuRef = useRef<View>(null);

  useEffect(() => {
    if (isOpen) {
      calculatePosition();

      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }).start();
      setIsPositioned(false);
    }
  }, [isOpen]);

  const calculatePosition = () => {
    if (triggerRef.current) {
      triggerRef.current.measure((x, y, width, height, pageX, pageY) => {
        const { width: screenWidth, height: screenHeight } =
          Dimensions.get('window');

        let menuLeft = pageX;
        let menuTop = pageY;

        // Calculate based on side
        switch (side) {
          case 'bottom':
            menuTop = pageY + height + sideOffset;
            break;
          case 'top':
            menuTop = pageY - maxHeight - sideOffset;
            break;
          case 'left':
            menuLeft = pageX - Number(width) - sideOffset;
            menuTop = pageY;
            break;
          case 'right':
            menuLeft = pageX + width + sideOffset;
            menuTop = pageY;
            break;
        }

        // Apply alignment
        switch (align) {
          case 'center':
            if (side === 'top' || side === 'bottom') {
              menuLeft = pageX + width / 2 - Number(width) / 2 + alignOffset;
            } else {
              menuTop = pageY + height / 2 - maxHeight / 2 + alignOffset;
            }
            break;
          case 'end':
            if (side === 'top' || side === 'bottom') {
              menuLeft = pageX + width - Number(width) - alignOffset;
            } else {
              menuTop = pageY + height - maxHeight - alignOffset;
            }
            break;
          default: // 'start'
            if (side === 'top' || side === 'bottom') {
              menuLeft = pageX + alignOffset;
            } else {
              menuTop = pageY + alignOffset;
            }
        }

        // Prevent menu from going off screen
        menuLeft = Math.max(
          insets.left + 4,
          Math.min(menuLeft, screenWidth - Number(width) - insets.right - 4),
        );

        // Vertical boundary checking
        if (
          side === 'bottom' &&
          menuTop + maxHeight > screenHeight - insets.bottom
        ) {
          // Flip to top if not enough space at bottom
          menuTop = pageY - maxHeight - sideOffset;
        } else if (side === 'top' && menuTop < insets.top) {
          // Flip to bottom if not enough space at top
          menuTop = pageY + height + sideOffset;
        } else if (
          (side === 'left' || side === 'right') &&
          menuTop + maxHeight > screenHeight - insets.bottom
        ) {
          menuTop = screenHeight - maxHeight - insets.bottom - 4;
        } else if (
          (side === 'left' || side === 'right') &&
          menuTop < insets.top
        ) {
          menuTop = insets.top + 4;
        }

        setMenuPosition({ top: menuTop, left: menuLeft });
        setIsPositioned(true);
      });
    }
  };

  if (!isOpen) return null;

  return (
    <Modal
      transparent
      visible={isOpen}
      animationType="none"
      onRequestClose={closeMenu}
    >
      <TouchableWithoutFeedback onPress={closeMenu}>
        <View style={StyleSheet.absoluteFillObject} />
      </TouchableWithoutFeedback>

      {isPositioned && (
        <Animated.View
          ref={menuRef}
          style={[style,
            {
              position: 'absolute',
              top: menuPosition.top,
              left: menuPosition.left,
              width: width,
              maxHeight: maxHeight,
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            //   backgroundColor: '#FFFFFF',
            //   borderRadius: 8,
            //   paddingVertical: 8,
            //   shadowColor: '#000',
            //   shadowOffset: {
            //     width: 0,
            //     height: 2,
            //   },
            //   shadowOpacity: 0.25,
            //   shadowRadius: 3.84,
            //   elevation: 5,
            }]}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            bounces={false}
            nestedScrollEnabled={true}
          >
            {children}
          </ScrollView>
        </Animated.View>
      )}
    </Modal>
  );
};

// Menu Item Component
interface MenuItemProps {
  children: React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  destructive?: boolean;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: any;
  textStyle?: any;
  isselected?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({
  children,
  onPress,
  disabled = false,
  destructive = false,
  icon,
  rightIcon,
  style,
  textStyle,
  isselected = false,
}) => {
  const { closeMenu } = useMenuContext();

  const handlePress = () => {
    if (disabled) return;
    onPress?.();
    closeMenu();
  };

  const getTextColor = () => {
    if (disabled) return '#9CA3AF';
    if (destructive) return '#EF4444';
    return '#1F2937';
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={disabled}
      style={[styles.menuItem, disabled && styles.menuItemDisabled, style]}
      activeOpacity={0.7}
    >
      <View style={styles.menuItemContent}>
        {icon && <View style={styles.menuItemIcon}>{icon}</View>}
        <Text
          style={[styles.menuItemText, { color: getTextColor() }, textStyle]}
          numberOfLines={1}
        >
          {children}
        </Text>
        {isselected &&(<CheckCircle size={16} color={colors.green5} />)}
        {rightIcon && <View style={styles.menuItemRightIcon}>{rightIcon}</View>}
      </View>
    </TouchableOpacity>
  );
};

// Menu Separator Component
const MenuSeparator: React.FC = () => {
  return <View style={styles.separator} />;
};

// Menu Group Component
interface MenuGroupProps {
  children: React.ReactNode;
  title?: string;
}

const MenuGroup: React.FC<MenuGroupProps> = ({ children, title }) => {
  return (
    <View style={styles.group}>
      {title && <Text style={styles.groupTitle}>{title}</Text>}
      {children}
    </View>
  );
};

// Fixed Menu Sub Component
interface MenuSubProps {
  children: React.ReactNode;
  title: string;
  icon?: React.ReactNode;
}

const MenuSub: React.FC<MenuSubProps> = ({ children, title, icon }) => {
  const [isOpen, setIsOpen] = useState(false);
  const subTriggerRef = useRef<View>(null);

  return (
    <View>
      <TouchableOpacity
        ref={subTriggerRef}
        onPress={() => setIsOpen(!isOpen)}
        style={styles.menuItem}
        activeOpacity={0.7}
      >
        <View style={styles.menuItemContent}>
          {icon && <View style={styles.menuItemIcon}>{icon}</View>}
          <Text style={styles.menuItemText}>{title}</Text>
          <View style={styles.menuItemRightIcon}>
            <Text style={styles.subMenuArrow}>▶</Text>
          </View>
        </View>
      </TouchableOpacity>

      {isOpen && <View style={styles.subMenuContent}>{children}</View>}
    </View>
  );
};

// Alternative SubMenu with nested positioning
interface NestedMenuSubProps {
  children: React.ReactNode;
  title: string;
  icon?: React.ReactNode;
}

const NestedMenuSub: React.FC<NestedMenuSubProps> = ({
  children,
  title,
  icon,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [subMenuPosition, setSubMenuPosition] = useState({ top: 0, left: 0 });
  const itemRef = useRef<View>(null);

  const handlePress = () => {
    if (itemRef.current) {
      itemRef.current.measure((x, y, width, height, pageX, pageY) => {
        setSubMenuPosition({
          top: pageY,
          left: pageX + width,
        });
        setIsOpen(true);
      });
    }
  };

  return (
    <>
      <TouchableOpacity
        ref={itemRef}
        onPress={handlePress}
        style={styles.menuItem}
        activeOpacity={0.7}
      >
        <View style={styles.menuItemContent}>
          {icon && <View style={styles.menuItemIcon}>{icon}</View>}
          <Text style={styles.menuItemText}>{title}</Text>
          <View style={styles.menuItemRightIcon}>
            <Text style={styles.subMenuArrow}>▶</Text>
          </View>
        </View>
      </TouchableOpacity>

      {isOpen && (
        <Modal
          transparent
          visible={isOpen}
          animationType="none"
          onRequestClose={() => setIsOpen(false)}
        >
          <TouchableWithoutFeedback onPress={() => setIsOpen(false)}>
            <View style={StyleSheet.absoluteFillObject} />
          </TouchableWithoutFeedback>

          <Animated.View
            style={[
              styles.content,
              {
                position: 'absolute',
                top: subMenuPosition.top,
                left: subMenuPosition.left,
                width: 180,
                maxHeight: 300,
              },
            ]}
          >
            <ScrollView bounces={false}>{children}</ScrollView>
          </Animated.View>
        </Modal>
      )}
    </>
  );
};

// Styles
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  content: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  menuItemDisabled: {
    opacity: 0.5,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemIcon: {
    marginRight: 12,
    width: 20,
    alignItems: 'center',
  },
  menuItemRightIcon: {
    marginLeft: 'auto',
    paddingLeft: 12,
  },
  menuItemText: {
    fontSize: 14,
    fontWeight: '400',
    flex: 1,
  },
  separator: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 8,
  },
  group: {
    marginVertical: 4,
  },
  groupTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    paddingVertical: 6,
    paddingHorizontal: 16,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  subMenuContent: {
    paddingLeft: 16,
    backgroundColor: '#F9FAFB',
    marginVertical: 2,
  },
  subMenuArrow: {
    fontSize: 12,
    color: '#6B7280',
  },
});

// Export compound component
export const Menu = {
  Root: MenuRoot,
  Trigger: MenuTrigger,
  Content: MenuContent,
  Item: MenuItem,
  Separator: MenuSeparator,
  Group: MenuGroup,
  Sub: MenuSub,
  NestedSub: NestedMenuSub, // Alternative with proper positioning
};
