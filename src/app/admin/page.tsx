"use client";

import { useEffect, useState } from "react";

const ADMIN_PASSWORD = "SingBDaDMin*(__)";
const ADMIN_STORAGE_KEY = "singbd_admin_authed";

const categories = [
  { label: "Woven Tops", slug: "woven-tops" },
  { label: "Woven Bottoms", slug: "woven-bottoms" },
  { label: "Coats & Jackets", slug: "coats-jackets" },
  { label: "Denim", slug: "denim" },
  { label: "Knitwear", slug: "knitwear" },
  { label: "Sweaters", slug: "sweater" },
  { label: "Sportswear", slug: "sportswear" },
  { label: "Homeware", slug: "homeware" },
  { label: "Handicrafts", slug: "handicrafts" },
  { label: "Workwear", slug: "workwear" },
];

function useStatus() {
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const reset = () => {
    setStatus(null);
    setError(null);
  };

  return { status, error, setStatus, setError, reset };
}

type AdminProduct = {
  id: string;
  name?: string;
  productCode?: string;
  description?: string;
  shortDescription?: string;
  categorySlug?: string;
  image?: string;
  isActive?: boolean;
};

type AdminCertification = {
  id: string;
  name?: string;
  status?: string;
  description?: string;
  image?: string;
  isActive?: boolean;
};

export default function AdminPage() {
  const [isAuthed, setIsAuthed] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"products" | "clients" | "certifications" | "contact">(
    "products"
  );
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [productsError, setProductsError] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(null);
  const [certifications, setCertifications] = useState<AdminCertification[]>([]);
  const [certificationsLoading, setCertificationsLoading] = useState(false);
  const [certificationsError, setCertificationsError] = useState<string | null>(null);

  const productStatus = useStatus();
  const clientStatus = useStatus();
  const certificationStatus = useStatus();
  const settingsStatus = useStatus();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(ADMIN_STORAGE_KEY);
    if (stored === "true") {
      setIsAuthed(true);
    }
  }, []);

  useEffect(() => {
    if (!isAuthed) return;
    void loadProducts();
    void loadCertifications();
  }, [isAuthed]);

  async function loadProducts() {
    setProductsLoading(true);
    setProductsError(null);

    try {
      const response = await fetch("/api/admin/products");
      const data = await response.json();

      if (!response.ok) {
        setProductsError(data.message || "Unable to load products.");
        return;
      }

      setProducts(Array.isArray(data.products) ? data.products : []);
    } catch (err) {
      setProductsError("Unable to load products.");
    } finally {
      setProductsLoading(false);
    }
  }

  async function handleDeleteProduct(productId: string, productName: string) {
    if (!confirm(`Are you sure you want to delete "${productName}"?`)) {
      return;
    }

    productStatus.reset();
    productStatus.setStatus("Deleting...");

    try {
      const response = await fetch(`/api/admin/products?id=${productId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        productStatus.setError(data.message || "Failed to delete product.");
        return;
      }

      productStatus.setStatus("Product deleted successfully.");
      await loadProducts();
    } catch (err) {
      productStatus.setError("Unable to delete product.");
    }
  }

  async function handleUpdateProduct(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!editingProduct) return;

    productStatus.reset();
    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.append("id", editingProduct.id);

    try {
      const response = await fetch("/api/admin/products", {
        method: "PUT",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        productStatus.setError(data.message || "Something went wrong.");
        return;
      }

      productStatus.setStatus("Product updated successfully.");
      setEditingProduct(null);
      form.reset();
      await loadProducts();
    } catch (err) {
      productStatus.setError("Unable to update product. Please try again.");
    }
  }

  const filteredProducts = categoryFilter === "all" 
    ? products 
    : products.filter(p => p.categorySlug === categoryFilter);

  async function loadCertifications() {
    setCertificationsLoading(true);
    setCertificationsError(null);

    try {
      const response = await fetch("/api/admin/certifications");
      const data = await response.json();

      if (!response.ok) {
        setCertificationsError(data.message || "Unable to load certifications.");
        return;
      }

      setCertifications(Array.isArray(data.certifications) ? data.certifications : []);
    } catch (err) {
      setCertificationsError("Unable to load certifications.");
    } finally {
      setCertificationsLoading(false);
    }
  }

  function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAuthError(null);

    if (passwordInput !== ADMIN_PASSWORD) {
      setAuthError("Incorrect password.");
      return;
    }

    setIsAuthed(true);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(ADMIN_STORAGE_KEY, "true");
    }
    setPasswordInput("");
  }

  function handleLogout() {
    setIsAuthed(false);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(ADMIN_STORAGE_KEY);
    }
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
    endpoint: string,
    status: ReturnType<typeof useStatus>,
    onSuccess?: () => void
  ) {
    event.preventDefault();
    status.reset();

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        status.setError(data.message || "Something went wrong.");
        return;
      }

      status.setStatus("Saved successfully.");
      form.reset();
      onSuccess?.();
    } catch (err) {
      status.setError("Unable to save. Please try again.");
    }
  }

  if (!isAuthed) {
    return (
      <main className="main" style={{ padding: "4rem 0" }}>
        <div className="container" style={{ maxWidth: "520px" }}>
          <h1 className="section__title">Admin Panel</h1>
          <p className="section__subtitle">Enter the admin password to continue.</p>
          <form onSubmit={handleLogin} style={{ marginTop: "2rem" }}>
            <div className="contact__form-group">
              <label className="contact__form-label" htmlFor="admin-password">
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                className="contact__form-input"
                autoComplete="current-password"
                value={passwordInput}
                onChange={(event) => setPasswordInput(event.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn--primary">
              Log in
            </button>
            {authError && <p style={{ color: "#A43C45", marginTop: "0.5rem" }}>{authError}</p>}
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="main" style={{ padding: "4rem 0" }}>
      <div className="container">
        <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem" }}>
          <div>
            <h1 className="section__title">Admin Panel</h1>
            <p className="section__subtitle">
              Manage products, clients, certifications, and contact info.
            </p>
          </div>
          <button type="button" className="btn btn--secondary" onClick={handleLogout}>
            Log out
          </button>
        </div>

        <div style={{ marginTop: "2.5rem", display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <button
            type="button"
            className={`btn ${activeTab === "products" ? "btn--primary" : "btn--secondary"}`}
            onClick={() => setActiveTab("products")}
            style={{ backgroundColor: "#000", color: "#fff", borderColor: "#000" }}
          >
            Products
          </button>
          <button
            type="button"
            className={`btn ${activeTab === "clients" ? "btn--primary" : "btn--secondary"}`}
            onClick={() => setActiveTab("clients")}
            style={{ backgroundColor: "#000", color: "#fff", borderColor: "#000" }}
          >
            Clients
          </button>
          <button
            type="button"
            className={`btn ${activeTab === "certifications" ? "btn--primary" : "btn--secondary"}`}
            onClick={() => setActiveTab("certifications")}
            style={{ backgroundColor: "#000", color: "#fff", borderColor: "#000" }}
          >
            Certifications
          </button>
          <button
            type="button"
            className={`btn ${activeTab === "contact" ? "btn--primary" : "btn--secondary"}`}
            onClick={() => setActiveTab("contact")}
            style={{ backgroundColor: "#000", color: "#fff", borderColor: "#000" }}
          >
            Contact Info
          </button>
        </div>

        {activeTab === "products" && (
          <section style={{ marginTop: "3rem", textAlign: "left" }}>
            <h2 style={{ textAlign: "left" }}>Products</h2>
            
            {/* Add New Product Form */}
            <div style={{ marginTop: "2rem", marginBottom: "3rem", padding: "1.5rem", backgroundColor: "#F9FAFB", borderRadius: "12px" }}>
              <h3 style={{ textAlign: "left", marginBottom: "1rem" }}>
                Add New Product
              </h3>
              <form
                onSubmit={(event) =>
                  handleSubmit(event, "/api/admin/products", productStatus, loadProducts)
                }
              >
                <div className="contact__form-row">
                  <div className="contact__form-group">
                    <label className="contact__form-label" htmlFor="product-name">
                      Name
                    </label>
                    <input
                      id="product-name"
                      name="name"
                      className="contact__form-input"
                      required
                    />
                  </div>
                  <div className="contact__form-group">
                    <label className="contact__form-label" htmlFor="product-code">
                      Product Code
                    </label>
                    <input
                      id="product-code"
                      name="productCode"
                      className="contact__form-input"
                    />
                  </div>
                </div>
                <div className="contact__form-group">
                  <label className="contact__form-label" htmlFor="product-short-desc">
                    Short Desc
                  </label>
                  <input
                    id="product-short-desc"
                    name="shortDescription"
                    className="contact__form-input"
                    required
                  />
                </div>
                <div className="contact__form-row">
                  <div className="contact__form-group">
                    <label className="contact__form-label" htmlFor="product-image">
                      Image File
                    </label>
                    <input
                      id="product-image"
                      name="image"
                      type="file"
                      accept="image/*"
                      className="contact__form-input"
                      required
                    />
                  </div>
                  <div className="contact__form-group">
                    <label className="contact__form-label" htmlFor="product-category">
                      Category
                    </label>
                    <select 
                      id="product-category" 
                      name="categorySlug" 
                      className="contact__form-input" 
                      required
                    >
                      <option value="">Select category</option>
                      {categories.map((category) => (
                        <option key={category.slug} value={category.slug}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <button type="submit" className="btn btn--primary" style={{ padding: "0.75rem 1.5rem", border: "2px solid #000", marginTop: "1rem" }}>
                  Save Product
                </button>
                {productStatus.status && <p style={{ marginTop: "0.75rem" }}>{productStatus.status}</p>}
                {productStatus.error && <p style={{ color: "#A43C45", marginTop: "0.75rem" }}>{productStatus.error}</p>}
              </form>
            </div>

            {/* Edit Product Modal */}
            {editingProduct && (
              <div
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 1000,
                  padding: "1rem",
                }}
                onClick={() => setEditingProduct(null)}
              >
                <div
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: "12px",
                    padding: "2rem",
                    maxWidth: "600px",
                    width: "100%",
                    maxHeight: "90vh",
                    overflow: "auto",
                    textAlign: "left",
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                    <h3 style={{ margin: 0 }}>Edit Product</h3>
                    <button
                      type="button"
                      onClick={() => setEditingProduct(null)}
                      style={{
                        background: "none",
                        border: "none",
                        fontSize: "1.5rem",
                        cursor: "pointer",
                        padding: "0.25rem",
                        lineHeight: 1,
                      }}
                    >
                      ×
                    </button>
                  </div>
                  <form
                    key={editingProduct.id}
                    onSubmit={handleUpdateProduct}
                  >
                    <div className="contact__form-row">
                      <div className="contact__form-group">
                        <label className="contact__form-label" htmlFor="edit-product-name">
                          Name
                        </label>
                        <input
                          id="edit-product-name"
                          name="name"
                          className="contact__form-input"
                          defaultValue={editingProduct.name || ""}
                          required
                        />
                      </div>
                      <div className="contact__form-group">
                        <label className="contact__form-label" htmlFor="edit-product-code">
                          Product Code
                        </label>
                        <input
                          id="edit-product-code"
                          name="productCode"
                          className="contact__form-input"
                          defaultValue={editingProduct.productCode || ""}
                        />
                      </div>
                    </div>
                    <div className="contact__form-group">
                      <label className="contact__form-label" htmlFor="edit-product-short-desc">
                        Short Desc
                      </label>
                      <input
                        id="edit-product-short-desc"
                        name="shortDescription"
                        className="contact__form-input"
                        defaultValue={editingProduct.shortDescription || ""}
                        required
                      />
                    </div>
                    <div className="contact__form-row">
                      <div className="contact__form-group">
                        <label className="contact__form-label" htmlFor="edit-product-image">
                          Image File (leave empty to keep current)
                        </label>
                        <input
                          id="edit-product-image"
                          name="image"
                          type="file"
                          accept="image/*"
                          className="contact__form-input"
                        />
                      </div>
                      <div className="contact__form-group">
                        <label className="contact__form-label" htmlFor="edit-product-category">
                          Category
                        </label>
                        <select 
                          id="edit-product-category" 
                          name="categorySlug" 
                          className="contact__form-input" 
                          defaultValue={editingProduct.categorySlug || ""}
                          required
                        >
                          <option value="">Select category</option>
                          {categories.map((category) => (
                            <option key={category.slug} value={category.slug}>
                              {category.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem" }}>
                      <button type="submit" className="btn btn--primary" style={{ padding: "0.75rem 1.5rem", border: "2px solid #000" }}>
                        Update Product
                      </button>
                      <button 
                        type="button" 
                        className="btn btn--secondary"
                        onClick={() => setEditingProduct(null)}
                        style={{ padding: "0.75rem 1.5rem", border: "2px solid #6B7280" }}
                      >
                        Cancel
                      </button>
                    </div>
                    {productStatus.status && <p style={{ marginTop: "0.75rem" }}>{productStatus.status}</p>}
                    {productStatus.error && <p style={{ color: "#A43C45", marginTop: "0.75rem" }}>{productStatus.error}</p>}
                  </form>
                </div>
              </div>
            )}

            {/* Products List with Filter */}
            <div style={{ marginTop: "2rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                <h3 style={{ textAlign: "left", margin: 0 }}>All Products ({filteredProducts.length})</h3>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <label htmlFor="category-filter" style={{ fontSize: "0.875rem", fontWeight: "500" }}>
                    Filter by Category:
                  </label>
                  <select
                    id="category-filter"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    style={{
                      padding: "0.5rem 0.75rem",
                      borderRadius: "8px",
                      border: "1px solid #E6E6E6",
                      fontSize: "0.875rem",
                    }}
                  >
                    <option value="all">All Categories</option>
                    {categories.map((category) => (
                      <option key={category.slug} value={category.slug}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {productsLoading && <p style={{ textAlign: "left" }}>Loading products...</p>}
              {productsError && <p style={{ color: "#A43C45", textAlign: "left" }}>{productsError}</p>}
              {!productsLoading && !productsError && filteredProducts.length === 0 && (
                <p style={{ textAlign: "left" }}>No products found.</p>
              )}
              {!productsLoading && !productsError && filteredProducts.length > 0 && (
                <div 
                  style={{ 
                    display: "grid", 
                    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", 
                    gap: "1.5rem" 
                  }}
                >
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      style={{
                        border: "1px solid #E6E6E6",
                        borderRadius: "12px",
                        overflow: "hidden",
                        backgroundColor: "#fff",
                        textAlign: "left",
                      }}
                    >
                      {product.image && (
                        <div style={{ width: "100%", height: "200px", overflow: "hidden", backgroundColor: "#F3F4F6" }}>
                          <img
                            src={product.image}
                            alt={product.name || "Product"}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                      )}
                      <div style={{ padding: "1rem" }}>
                        <h4 style={{ margin: "0 0 0.5rem 0", fontSize: "1rem", fontWeight: "600" }}>
                          {product.name || "Untitled Product"}
                        </h4>
                        <div style={{ fontSize: "0.875rem", color: "#6B7280", marginBottom: "0.5rem" }}>
                          {product.productCode && <div>Code: {product.productCode}</div>}
                          <div>Category: {product.categorySlug || "Uncategorized"}</div>
                          <div>Status: {product.isActive === false ? "Inactive" : "Active"}</div>
                        </div>
                        <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
                          <button
                            type="button"
                            onClick={() => setEditingProduct(product)}
                            style={{
                              flex: 1,
                              padding: "0.5rem",
                              backgroundColor: "#3B82F6",
                              color: "#fff",
                              border: "none",
                              borderRadius: "6px",
                              cursor: "pointer",
                              fontSize: "0.875rem",
                              fontWeight: "500",
                            }}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteProduct(product.id, product.name || "this product")}
                            style={{
                              flex: 1,
                              padding: "0.5rem",
                              backgroundColor: "#DC2626",
                              color: "#fff",
                              border: "none",
                              borderRadius: "6px",
                              cursor: "pointer",
                              fontSize: "0.875rem",
                              fontWeight: "500",
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {activeTab === "clients" && (
          <section style={{ marginTop: "3rem" }}>
            <h2>Client Logo</h2>
            <form onSubmit={(event) => handleSubmit(event, "/api/admin/clients", clientStatus)}>
            <div className="contact__form-row">
              <div className="contact__form-group">
                <label className="contact__form-label" htmlFor="client-name">
                  Client Name
                </label>
                <input id="client-name" name="name" className="contact__form-input" required />
              </div>
              <div className="contact__form-group">
                <label className="contact__form-label" htmlFor="client-logo">
                  Logo File
                </label>
                <input
                  id="client-logo"
                  name="logo"
                  type="file"
                  accept="image/*"
                  className="contact__form-input"
                  required
                />
              </div>
            </div>
            <button type="submit" className="btn btn--primary">
              Save Client Logo
            </button>
            {clientStatus.status && <p>{clientStatus.status}</p>}
            {clientStatus.error && <p style={{ color: "#A43C45" }}>{clientStatus.error}</p>}
          </form>
        </section>
        )}

        {activeTab === "certifications" && (
          <section style={{ marginTop: "3rem", textAlign: "left" }}>
            <h2 style={{ textAlign: "left" }}>Certifications</h2>
            
            {/* Add New Certification Form */}
            <div style={{ marginTop: "2rem", marginBottom: "3rem", padding: "1.5rem", backgroundColor: "#F9FAFB", borderRadius: "12px" }}>
              <h3 style={{ textAlign: "left", marginBottom: "1rem" }}>Add New Certification</h3>
              <form
                onSubmit={(event) =>
                  handleSubmit(event, "/api/admin/certifications", certificationStatus, loadCertifications)
                }
              >
                <div className="contact__form-row">
                  <div className="contact__form-group">
                    <label className="contact__form-label" htmlFor="cert-name">
                      Name
                    </label>
                    <input id="cert-name" name="name" className="contact__form-input" required />
                  </div>
                  <div className="contact__form-group">
                    <label className="contact__form-label" htmlFor="cert-status">
                      Status
                    </label>
                    <input id="cert-status" name="status" className="contact__form-input" required />
                  </div>
                </div>
                <div className="contact__form-group">
                  <label className="contact__form-label" htmlFor="cert-desc">
                    Short Desc
                  </label>
                  <input id="cert-desc" name="description" className="contact__form-input" required />
                </div>
                <div className="contact__form-group">
                  <label className="contact__form-label" htmlFor="cert-image">
                    Photo File
                  </label>
                  <input
                    id="cert-image"
                    name="image"
                    type="file"
                    accept="image/*"
                    className="contact__form-input"
                    required
                  />
                </div>
                <button type="submit" className="btn btn--primary" style={{ padding: "0.75rem 1.5rem", border: "2px solid #000", marginTop: "1rem" }}>
                  Save Certification
                </button>
                {certificationStatus.status && <p style={{ marginTop: "0.75rem" }}>{certificationStatus.status}</p>}
                {certificationStatus.error && (
                  <p style={{ color: "#A43C45", marginTop: "0.75rem" }}>{certificationStatus.error}</p>
                )}
              </form>
            </div>

            {/* Certifications List */}
            <div style={{ marginTop: "2rem" }}>
              <h3 style={{ textAlign: "left", marginBottom: "1.5rem" }}>All Certifications ({certifications.length})</h3>
              
              {certificationsLoading && <p style={{ textAlign: "left" }}>Loading certifications...</p>}
              {certificationsError && <p style={{ color: "#A43C45", textAlign: "left" }}>{certificationsError}</p>}
              {!certificationsLoading && !certificationsError && certifications.length === 0 && (
                <p style={{ textAlign: "left" }}>No certifications found.</p>
              )}
              {!certificationsLoading && !certificationsError && certifications.length > 0 && (
                <div 
                  style={{ 
                    display: "grid", 
                    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", 
                    gap: "1.5rem" 
                  }}
                >
                  {certifications.map((cert) => (
                    <div
                      key={cert.id}
                      style={{
                        border: "1px solid #E6E6E6",
                        borderRadius: "12px",
                        overflow: "hidden",
                        backgroundColor: "#fff",
                        textAlign: "left",
                      }}
                    >
                      {cert.image && (
                        <div style={{ width: "100%", height: "150px", overflow: "hidden", backgroundColor: "#F3F4F6", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
                          <img
                            src={cert.image}
                            alt={cert.name || "Certification"}
                            style={{
                              maxWidth: "100%",
                              maxHeight: "100%",
                              objectFit: "contain",
                            }}
                          />
                        </div>
                      )}
                      <div style={{ padding: "1rem" }}>
                        <h4 style={{ margin: "0 0 0.5rem 0", fontSize: "1rem", fontWeight: "600" }}>
                          {cert.name || "Untitled Certification"}
                        </h4>
                        <div style={{ fontSize: "0.875rem", color: "#6B7280", marginBottom: "0.5rem" }}>
                          {cert.status && <div style={{ marginBottom: "0.25rem" }}>Status: {cert.status}</div>}
                          {cert.description && <div>{cert.description}</div>}
                          <div style={{ marginTop: "0.5rem" }}>Active: {cert.isActive === false ? "No" : "Yes"}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {activeTab === "contact" && (
          <section style={{ marginTop: "3rem" }}>
            <h2>Contact Info</h2>
            <form onSubmit={(event) => handleSubmit(event, "/api/admin/settings", settingsStatus)}>
            <div className="contact__form-row">
              <div className="contact__form-group">
                <label className="contact__form-label" htmlFor="contact-email">
                  Email
                </label>
                <input id="contact-email" name="email" className="contact__form-input" required />
              </div>
              <div className="contact__form-group">
                <label className="contact__form-label" htmlFor="contact-phone">
                  Contact No
                </label>
                <input id="contact-phone" name="phone" className="contact__form-input" required />
              </div>
            </div>
            <div className="contact__form-group">
              <label className="contact__form-label" htmlFor="contact-address">
                Address
              </label>
              <textarea
                id="contact-address"
                name="address"
                rows={3}
                className="contact__form-textarea"
                placeholder="One line per address row"
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn--primary">
              Save Contact Info
            </button>
            {settingsStatus.status && <p>{settingsStatus.status}</p>}
            {settingsStatus.error && <p style={{ color: "#A43C45" }}>{settingsStatus.error}</p>}
          </form>
        </section>
        )}
      </div>
    </main>
  );
}
