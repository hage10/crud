import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import PostApi from "../api/entities/PostApi";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import { useForm } from "react-hook-form";

const DataTableBasic = () => {
  const toast = useRef(null);
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [products, setProducts] = useState([]);
  const [productDialog, setProductDialog] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [updateProductDialog, setUpdateProductDialog] = useState(false);

  function getAllList() {
    PostApi.getList(1, 100)
      .then((res) => {
        let newData = res.data;
        setProducts(newData);
      })
      .catch((error) => console.log(error));
  }
  useEffect(() => {
    getAllList();
  }, []);
  const hideDialog = () => {
    setProductDialog(false);
  };
  /**
   * handle update product
   * @param {*} product
   */
  const editProduct = (product) => {
    console.log(product);
    setUpdateProductDialog(true);
    setValue("title", product.title);
    setValue("author", product.author);
    register("id", product.id);
    setValue("id", product.id);
  };
  const confirmUpdateProduct = (data) => {
    PostApi.update(data.id, data)
      .then(() => {
        setUpdateProductDialog(false);
        getAllList();
        toast.current.show({
          severity: "success",
          summary: "Success Message",
          detail: "Order submitted",
        });

      })
      .catch((error) => {
        setUpdateProductDialog(false);
        toast.current.show({
          severity: "error",
          summary: "Error Message",
          detail: "Order submitted",
        });

      });
  };
  const hideUpdateProductDialog = () => {
    setUpdateProductDialog(false);
  };
  /**
   * Handle delete product
   * @param {*} product
   */
  const deleteProduct = (product) => {
    sessionStorage.setItem("id", product.id)
    setDeleteProductDialog(true);
  };
  const confirmDeleteProduct = () => {
    let currentID = sessionStorage.getItem('id')
    PostApi.delete(currentID).then(() => {
      setDeleteProductDialog(false)
      getAllList();
      toast.current.show({
        severity: "success",
        summary: "Success Message",
        detail: "Order submitted",
      });
    })
      .catch(() => {
        setDeleteProductDialog(false)
        toast.current.show({
          severity: "error",
          summary: "Success Message",
          detail: "Order submitted",
        });
      })
  };
  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };

  /**
   * handle addProduct
   */
  const addProduct = () => {
    setProductDialog(true);
    setValue("title", "");
    setValue("author", "");
    setValue("id", "");
  };
  const confirmAddProduct = (data) => {
    PostApi.add(data)
      .then((res) => {
        setProductDialog(false);
        getAllList();
        toast.current.show({
          severity: "success",
          summary: "Success Message",
          detail: "Order submitted",
        });
      })
      .catch((error) => {
        setProductDialog(false);
        toast.current.show({
          severity: "error",
          summary: "Error Message",
          detail: "Order submitted",
        });
      });
  };
  const hideAddProductDialog = () => {
    setProductDialog(false)
  }
  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2"
          onClick={() => editProduct(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => deleteProduct(rowData)}
        />
      </React.Fragment>
    );
  };
  return (
    <div>
      <div className="card">
        <DataTable className="border-solid border-bluegray-200 text-center" value={products} responsiveLayout="scroll">
          <Column className="text-center" field="id" header="ID"></Column>
          <Column field="title" header="Title"></Column>
          <Column field="author" header="Author"></Column>
          <Column body={actionBodyTemplate} header="Function"></Column>
        </DataTable>
        <Button
          label="Thêm mới"
          icon="pi pi-plus"
          className="p-button p-button-success mr-2 mt-4"
          onClick={addProduct}
        />
      </div>
      <Dialog
        header="Add post"
        visible={productDialog}
        style={{ width: "450px" }}
        onHide={hideDialog}
      >
        <form onSubmit={handleSubmit(confirmAddProduct)}>
          <div className="card">
            <div className="field">
              <label htmlFor="title">Title</label>
              <InputText
                className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
                id="title"
                name="title"
                autoComplete="off"
                {...register("title", {
                  required: "Không được bỏ trống",
                })}
              />
              <span style={{ color: "red" }}>
                {errors.title && errors.title.message}
              </span>
            </div>
            <div className="field">
              <label htmlFor="author">Author</label>

              <InputText
                className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
                id="author"
                name="author"
                autoComplete="off"
                {...register("author", {
                  required: "Không được bỏ trống",
                })}
              />
              <span style={{ color: "red" }}>
                {errors.author && errors.author.message}
              </span>
            </div>
          </div>
          <div className="card flex justify-content-end">
            <React.Fragment>
              <Button
                label="No"
                icon="pi pi-times"
                className="m-2"
                type="button"
                onClick={hideAddProductDialog}
              />
              <Button
                label="Yes"
                icon="pi pi-check"
                className="m-2"
                type="submit"
              />
            </React.Fragment>
          </div>
        </form>
      </Dialog>
      <Dialog
        visible={deleteProductDialog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        onHide={hideDeleteProductDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {
            <span>
              Bạn có muốn xóa bản ghi có ID: <b>{sessionStorage.getItem("id")}</b>?
            </span>
          }
        </div>
        <React.Fragment>
          <Button
            label="No"
            icon="pi pi-times"
            className="p-button-text"
            onClick={hideDeleteProductDialog}
          />
          <Button
            label="Yes"
            icon="pi pi-check"
            className="p-button-text"
            onClick={confirmDeleteProduct}
          />
        </React.Fragment>
      </Dialog>
      <Dialog
        visible={updateProductDialog}
        style={{ width: "450px" }}
        header="Update post"
        modal
        onHide={hideUpdateProductDialog}
      >
        <form onSubmit={handleSubmit(confirmUpdateProduct)}>
          <div className="card">
            <div className="field">
              <label htmlFor="title">Title</label>
              <InputText
                className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
                id="title"
                name="title"
                autoComplete="off"
                {...register("title", {
                  required: "Không được bỏ trống",
                })}
              />
              <span style={{ color: "red" }}>
                {errors.title && errors.title.message}
              </span>
            </div>
            <div className="field">
              <label htmlFor="author">Author</label>

              <InputText
                className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
                id="author"
                name="author"
                autoComplete="off"
                {...register("author", {
                  required: "Không được bỏ trống",
                })}
              />
              <span style={{ color: "red" }}>
                {errors.author && errors.author.message}
              </span>
            </div>
          </div>
          <div className="card flex justify-content-end">
            <React.Fragment>
              <Button
                label="No"
                icon="pi pi-times"
                className="m-2"
                type="button"
                onClick={hideUpdateProductDialog}
              />
              <Button
                label="Yes"
                icon="pi pi-check"
                className="m-2"
                type="submit"
              />
            </React.Fragment>
          </div>
        </form>
      </Dialog>
      <Toast ref={toast}></Toast>
    </div>
  );
};
export default DataTableBasic;
