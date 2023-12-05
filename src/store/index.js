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
import { collection, addDoc, getDocs, query } from 'firebase/firestore';

export default createStore({
  plugins: [createPersistedState({
    storage: window.sessionStorage,
  })],
  state: {
    user: null,
    menu: [
      {
        id: 0,
        name: "Torta",
        price: 100,
        description: "Torta de chocolate",
        image: "https://picsum.photos/200/300",
        quantity: 0
      },
      {
        id: 1,
        name: "Refresco",
        price: 40,
        description: "Refresco de fresa",
        image: "https://picsum.photos/200/300",
        quantity: 0
      },
      {
        id: 2,
        name: "Café",
        price: 30,
        description: "Café americano",
        image: "https://picsum.photos/200/300",
        quantity: 0
      },
    ],
    order: {
      buyersName: "",
      buyersPhone: "",
      items: [],
      total: 0,
      comments: "",
      date: Date.now(),
    },
    orderId: null,
    orders: [],
  },
  getters: {
    menuItems(state) {
      return state.menu;
    },
    total(state) {
      return state.order.total;
    },
    orderItems(state) {
      return state.menu.filter((item) => item.quantity > 0);
    },
    orders(state) {
      const yesterday = moment().subtract(1, "days").format("YYYY-MM-DD");
      return state.orders.filter((order) => {
        return moment(order.date).format("YYYY-MM-DD") === yesterday;
      });
    }
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    CLEAR_USER(state) {
      state.user = null;
    },
    ADD_ITEM(state, item) {
      state.menu[item.id].quantity = item.quantity + 1;
      state.order.total += item.price;
    },
    UPDATE_ITEM_PLUS(state, item) {
      state.menu[item.id].quantity = item.quantity + 1;
      state.order.total += item.price;
    },
    UPDATE_ITEM_MINUS(state, item) {
      state.menu[item.id].quantity = item.quantity - 1;
      state.order.total -= item.price;
    },
    DELETE_ITEM(state, item) {
      state.order.total -= item.price * item.quantity;
      state.menu[item.id].quantity = 0;
    },
    ADD_COMMENTS(state, comments) {
      state.order.comments = comments;
    },
    UPDATE_QUANTITY(state, { id, quantity }) {
      state.menu[id].quantity = quantity;
      state.order.total = state.menu.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);
    },
    CLEAR_ORDER(state) {
      state.order = {
        buyersName: "",
        buyersPhone: "",
        items: [],
        total: 0,
        comments: "",
        date: Date.now(),
      };
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
  },
  actions: {
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
      const q = query(collection(db, "orders"));
      const querySnapshot = await getDocs(q);
      querySnapshot
        .forEach((doc) => {
          orders.push({ id: doc.id, ...doc.data() });
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
  modules: {},
});
