export const routes = {
  landing: {
    redirect: "/",
  },
  login: {
    redirect: "/login",
  },
  home: {
    redirect: "/dashboard",
  },
  product: {
    redirect: "/products",
  },
  mint: {
    redirect: "/dashboard/mint",
    children: {
      mintOne: {
        redirect: "/dashboard/mint/one",
      },
      mintMany: {
        redirect: "/dashboard/mint/many",
      },
    },
  },
  utilities: {
    redirect: "/dashboard/utilities",
    children: {
      collection: {
        redirect: "/dashboard/utilities/collection",
      },
      storage: {
        redirect: "/dashboard/utilities/storage",
        children: {
          upload: {
            redirect: "/dashboard/utilities/storage/upload",
          },
        },
      },
      fastCollection: {
        redirect: "/dashboard/utilities/fast-collection",
      },
    },
  },
  suppliers: {
    redirect: "/dashboard/suppliers",
  },
  products: {
    redirect: "/dashboard/products",
  },
  services: {
    redirect: "/dashboard/services",
  },

  warehouse: {
    redirect: "/dashboard/warehouse",
  },

  download: {
    redirect: "/download",
  },
};
