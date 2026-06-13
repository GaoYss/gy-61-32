import { EmptyState } from "./EmptyState";

export function ListPage({ title, description, loading, error, items, filters, children }) {
  const content = () => {
    if (loading) {
      return <EmptyState title="加载中..." variant="loading" />;
    }
    if (error) {
      return <EmptyState title={error} variant="error" />;
    }
    if (!items || items.length === 0) {
      return <EmptyState />;
    }
    return children;
  };

  return (
    <section className="view-stack">
      <header className="page-header">
        <div>
          <h1>{title}</h1>
          {description && <p>{description}</p>}
        </div>
      </header>
      {filters}
      {content()}
    </section>
  );
}
