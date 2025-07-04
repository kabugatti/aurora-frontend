use crate::storage_types::DataKey;
use soroban_sdk::{Env, Address};

pub fn read_admin(env: &Env) -> Address {
    env.storage().instance().get(&DataKey::Admin).unwrap()
}

pub fn write_admin(env: &Env, admin: &Address) {
    env.storage()
        .instance()
        .set(&DataKey::Admin, admin);
}
