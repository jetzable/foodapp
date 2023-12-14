import { createStore } from "vuex";
import router from "../router";
import { auth } from "../firebase";
import moment from "moment";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import createPersistedState from "vuex-persistedstate";

import { db } from '../firebase';
import { collection, addDoc, getDocs,
  query, doc, updateDoc, getDoc } from 'firebase/firestore';

export default createStore({
  plugins: [createPersistedState({
    storage: window.sessionStorage,
  })],
  state: {
    orderDetail: null,
    itemToUpdate: null,
    user: null,
    menu: [],
    total: 0,
    order: {
      buyersName: "",
      buyersPhone: "",
      items: [],
      comments: "",
      date: Date.now(),
      delivered: false,
    },
    orderId: null,
    orders: [],
  },
  getters: {
    menuItems(state) {
      return state.menu;
    },
    total(state) {
      return state.menu.reduce((count, item) => {
        return count + (item.price * item.quantity);
      }, 0);
    },
    orderItems(state) {
      return state.menu.filter((item) => item.quantity > 0);
    },
    orders(state) {
      return state.orders
    },
    menu(state) {
      return state.menu;
    },
    orderDetail(state) {
      return state.orderDetail;
    },
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    CLEAR_USER(state) {
      state.user = null;
    },
    ADD_ITEM(state, item) {
      const index = state.menu.findIndex((i) => i.id === item.id);
      state.menu[index].quantity = item.quantity + 1;
      state.total += item.price;
    },
    UPDATE_ITEM_PLUS(state, item) {
      const index = state.menu.findIndex((i) => i.id === item.id);
      state.menu[index].quantity = item.quantity + 1;
      state.total += item.price;
    },
    UPDATE_ITEM_MINUS(state, item) {
      const index = state.menu.findIndex((i) => i.id === item.id);
      state.menu[index].quantity = item.quantity - 1;
      state.total -= item.price;
    },
    DELETE_ITEM(state, item) {
      const index = state.menu.findIndex((i) => i.id === item.id);
      state.total -= item.price * item.quantity;
      state.menu[index].quantity = 0;
    },
    ADD_COMMENTS(state, comments) {
      state.order.comments = comments;
    },
    UPDATE_QUANTITY(state, {id, quantity}) {
      const index = state.menu.findIndex((i) => i.id === id);
      state.menu[index].quantity = quantity;
      state.total = state.menu.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);
    },
    SET_ORDER_DETAIL(state, order) {
      state.orderDetail = order;
    },
    CLEAR_ORDER(state) {
      state.order = {
        buyersName: "",
        buyersPhone: "",
        items: [],
        comments: "",
        date: Date.now(),
      };
      state.total = 0;
    },
    SET_BUYER_NAME(state, name) {
      state.order.buyersName = name;
    },
    SET_BUYER_PHONE(state, phone) {
      state.order.buyersPhone = phone;
    },
    SET_ORDER_COMMENTS(state, comments) {
      state.order.comments = comments;
    },
    SET_ORDER_ID(state, orderId) {
      state.orderId = orderId;
    },
    SET_ORDERS(state, orders) {
      state.orders = orders;
    },
    SET_MENU(state, menu) {
      state.menu = menu;
    },
    SET_ITEM_TO_UPDATE(state, item) {
      state.itemToUpdate = item;
    }
  },
  actions: {
    async getOrderDetail({ commit }, orderId) {
      const docRef = doc(db, "orders", orderId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        commit("SET_ORDER_DETAIL", docSnap.data());
      } else {
        console.log("No such document!");
      }
    },
    async getMenuItems({ commit }) {
      const menu = [];
      const q = query(collection(db, "menu"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        if (doc.exists()) {
          if (doc.data().active) {
            menu.push({ id: doc.id, ...doc.data(), quantity: 0 });
          }
        }
      });
      commit("SET_MENU", menu);
      return;
    },
    async confirmOrder({ state, commit }) {
      const order = state.order;
      order.items = state.menu.filter((item) => item.quantity > 0).map((item) => {
        return {
          id: item.id,
          name: item.name,
          quantity: item.quantity,
        };
      });
      const docRef = await addDoc(collection(db, "orders"), order);
      state.orderId = docRef.id;
      commit("CLEAR_ORDER");
      state.menu = state.menu.map((item) => ({ ...item, quantity: 0 }));
      return
    },
    async register({ commit }, details) {
      const { email, password } = details;
      try {
        const user = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        commit("SET_USER", user);
        router.push({ name: "home" });
      } catch (error) {
        switch (error.code) {
          case "auth/email-already-in-use":
            alert("Email is already in use.");
            break;
          case "auth/invalid-email":
            alert("Email is invalid.");
            break;
          case "auth/operation-not-allowed":
            alert("Operation is not allowed.");
            break;
          case "auth/weak-password":
            alert("Password is weak.");
            break;
          default:
            alert("Unknown error.");
            break;
        }
      }
    },
    async login({ commit }, details) {
      const { email, password } = details;
      try {
        await signInWithEmailAndPassword(auth, email, password);
        commit("SET_USER", auth.user);
        router.push({ name: "orders" });
      } catch (error) {
        switch (error.code) {
          case "auth/invalid-email":
            alert("Email is invalid.");
            break;
          case "auth/user-disabled":
            alert("User is disabled.");
            break;
          case "auth/user-not-found":
            alert("User not found.");
            break;
          case "auth/wrong-password":
            alert("Wrong password.");
            break;
          default:
            alert("Unknown error.");
            break;
        }
        return;
      }
    },
    async getOrders({ commit }) {
      const orders = [];
      const yesterday = moment().subtract(3, "days").format("YYYY-MM-DD");
      const q = query(collection(db, "orders"));
      const querySnapshot = await getDocs(q);
      querySnapshot
        .forEach((doc) => {
          if (doc.exists() &&
            moment(doc.data().date).format("YYYY-MM-DD") === yesterday) {
            orders.push({ id: doc.id, ...doc.data() });
          }
        });
      commit("SET_ORDERS", orders);
      return;
    },
    async logout({ commit }) {
      try {
        await signOut(auth);
        commit("CLEAR_USER");
        router.push({ name: "login" });
      } catch (error) {
        alert("Unknown error.");
      }
      //
    },
    // eslint-disable-next-line no-unused-vars
    async updateDelivery({ commit, dispatch, state }, orderId) {
      try {
        const ordersRef = doc(db, "orders", orderId);
        await updateDoc(ordersRef, {
          delivered: !state.orders.find((order) => order.id === orderId).delivered ,
        });
        this.dispatch("getOrders");
      } catch (error) {
        console.log(error);
      }
    },
    // eslint-disable-next-line no-unused-vars
    async deleteMenuItem({ commit }, item) {
      try {
        const menuRef = doc(db, "menu", item.id);
        await updateDoc(menuRef, {
          active: false,
        });
        this.dispatch("getMenuItems");
      } catch (error) {
        console.log(error);
      }
    },
    // eslint-disable-next-line no-unused-vars
    async createNewMenuItem({ commit }, item) {
      try {
        await addDoc(collection(db, "menu"), item);
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    },
    async updateMenuItem({ state }) {
      try {
        const item = state.itemToUpdate;
        const menuRef = doc(db, "menu", item.id);
        await updateDoc(menuRef, {
          name: item.name,
          description: item.description,
          price: item.price,
          image: item.image,
          active: item.active,
        });
        router.push({ name: "menu" });
      } catch (error) {
        console.log(error);
      }
    },
    fetchUser({ commit }) {
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          commit("SET_USER", user);
          if (router.isReady && router.currentRoute.value.name === "login") {
            router.push({ name: "home" });
          }
        } else {
          commit("CLEAR_USER");
        }
      });
    },
  },
  modules: {
    auth
  },
});


// Menu example

// [
//   {
//     id: 0,
//     name: "Torta",
//     price: 100,
//     description: "Torta de chocolate",
//     image: "https://picsum.photos/200/300",
//     quantity: 0
//     active: true
//   },
//   {
//     id: 1,
//     name: "Refresco",
//     price: 40,
//     description: "Refresco de fresa",
//     image: "https://picsum.photos/200/300",
//     quantity: 0
//   },
//   {
//     id: 2,
//     name: "Café",
//     price: 30,
//     description: "Café americano",
//     image: "https://picsum.photos/200/300",
//     quantity: 0
//   },
// ]