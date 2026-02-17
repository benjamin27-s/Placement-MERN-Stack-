import { useEffect, useId, useRef, useState } from "react";

export default function ProfileMenu({ initials = "U", onSelect }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e) => {
      if (!rootRef.current) return;
      if (rootRef.current.contains(e.target)) return;
      setOpen(false);
    };

    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const handleSelect = (key) => {
    onSelect?.(key);
    setOpen(false);
  };

  return (
    <div className="profileMenu" ref={rootRef}>
      <button
        className="profileMenu__button"
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
      >
        {String(initials || "U").slice(0, 2).toUpperCase()}
      </button>

      {open ? (
        <div className="profileMenu__dropdown" role="menu" id={menuId}>
          <button
            className="profileMenu__item"
            type="button"
            role="menuitem"
            onClick={() => handleSelect("profile")}
          >
            Profile
          </button>
          <button
            className="profileMenu__item"
            type="button"
            role="menuitem"
            onClick={() => handleSelect("settings")}
          >
            Settings
          </button>
          <div className="profileMenu__divider" />
          <button
            className="profileMenu__item profileMenu__item--danger"
            type="button"
            role="menuitem"
            onClick={() => handleSelect("logout")}
          >
            Logout
          </button>
        </div>
      ) : null}
    </div>
  );
}
