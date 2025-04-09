// Định nghĩa datasource
// @dbdiagram-js: title: Cardano NFT Platform

Table user {
  id           varchar [pk]
  address      varchar [unique]
  created_at   datetime
  updated_at   datetime
}

Table wallet_nonce {
  id        varchar [pk]
  address   varchar [unique, ref: > user.address]
  nonce     varchar
  created_at datetime
  updated_at datetime
}

Table collection {
  id           varchar [pk]
  user_id      varchar [ref: > user.id]
  name         varchar
  thumbnail    varchar
  description  varchar
  created_at   datetime
  updated_at   datetime
}

Table metadata {
  id             varchar [pk]
  collection_id  varchar [ref: > collection.id]
  asset_name     varchar
  content        varchar
  nft_reference  text[] // array of references
  created_at     datetime
  updated_at     datetime
}

Table media {
  id        varchar [pk]
  user_id   varchar [ref: > user.id]
  name      varchar
  type      varchar
  url       varchar [unique]
  created_at datetime
  updated_at datetime
}

Table product {
  id                 varchar [pk]
  collection_id      varchar [ref: > collection.id]
  user_id            varchar [ref: > user.id]
  policy_id          varchar
  asset_name         varchar
  name               varchar
  history_hash       varchar
  created_at         datetime
  updated_at         datetime
}

Table document {
  id         varchar [pk]
  product_id varchar [ref: > product.id]
  doc_type   varchar
  url        varchar [unique]
  hash       varchar
  created_at datetime
  updated_at datetime
}

Table production_process {
  id         varchar [pk]
  product_id varchar [ref: > product.id]
  step_name  varchar
  start_time datetime
  end_time   datetime
  location   varchar
  created_at datetime
  updated_at datetime
}

Table certification {
  id          varchar [pk]
  product_id  varchar [ref: > product.id]
  cert_name   varchar
  issue_date  datetime
  expiry_date datetime
  cert_hash   varchar
  created_at  datetime
  updated_at  datetime
}

Table feedback {
  id         varchar [pk]
  user_id    varchar [ref: > user.id]
  product_id varchar [ref: > product.id]
  content    varchar
  rating     int
  created_at datetime
  updated_at datetime
}

Table supplier {
  id              varchar [pk]
  user_id         varchar [ref: > user.id]
  name            varchar
  location        varchar
  gps_coordinates varchar
  contact_info    varchar
  created_at      datetime
  updated_at      datetime
}

Table raw_material {
  id           varchar [pk]
  supplier_id  varchar [ref: > supplier.id]
  name         varchar
  harvest_date datetime
  quantity     float
  created_at   datetime
  updated_at   datetime
}

Table service_plan {
  id          varchar [pk]
  name        varchar
  description varchar
  price       float
  duration    int
  created_at  datetime
  updated_at  datetime
}

Table subscription {
  id              varchar [pk]
  user_id         varchar [ref: > user.id]
  service_plan_id varchar [ref: > service_plan.id]
  start_date      datetime
  end_date        datetime
  status          varchar
  created_at      datetime
  updated_at      datetime
}

Table payment {
  id              varchar [pk]
  user_id         varchar [ref: > user.id]
  subscription_id varchar [ref: > subscription.id]
  amount          float
  currency        varchar
  tx_hash         varchar [unique]
  payment_date    datetime
  created_at      datetime
  updated_at      datetime
}

Table warehouse {
  id         varchar [pk]
  name       varchar
  location   varchar
  capacity   int
  created_at datetime
  updated_at datetime
}

Table warehouse_storage {
  id           varchar [pk]
  product_id   varchar [ref: > product.id]
  warehouse_id varchar [ref: > warehouse.id]
  entry_time   datetime
  exit_time    datetime
  conditions   varchar
  created_at   datetime
  updated_at   datetime
}
