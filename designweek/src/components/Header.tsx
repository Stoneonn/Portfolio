import { siteConfig } from "../siteConfig";

export function Header() {
  return (
    <header className="header">
      <div className="header__left">
        <p className="header__left-label">{siteConfig.weekLabel}</p>
        <h1 className="header__projects">MDW 2026 Guide</h1>
      </div>
    </header>
  );
}
