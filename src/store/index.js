import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from "../router";
import "es6-promise/auto";

Vue.use(Vuex);

let DEBUG = 1;

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== "production",
    state: {
        data: {
            messages: {
                cartListMessageEmpty: "В данный момент корзина пуста.",
                cartListMessageAction: "Положите покупки в корзину и возвращайтесь.",
                contactData: "Введите данные для покупки:",
                messageNoAddress:
                    "Нам не удалось определить полный адрес доставки. Попробуйте еще раз или оформите заказ через оператора.",
                shippingAction: "Выберите способ доставки:",
                pickupAction: "Выберите точку самовывоза:",
                courierAction: "Выберите службу доставки:",
                paymentAction: "Выберите форму оплаты:",
                paymentDisabled: "При выбранном способе доставки данный вид оплаты недоступен",
                messageTooltipIconCashOpen: "Доступна оплата наличными",
                messageTooltipIconCashClose: "Оплата наличными не доступна",
                messageTooltipIconCardOpen: "Доступна оплата банковской картой",
                messageTooltipIconCardClose: "Оплата банковской картой не доступна",
                messageTooltipIconOnlineOpen: "Доступна оплата online на сайте",
                messageTooltipIconOnlineClose: "Оплата online на сайте не доступна",
                messageTooltipIconInvoiceOpen: "Доступна оплата через квитанцию банка",
                messageTooltipIconInvoiceClose: "Оплата через квитанцию банка не доступна",
                gtProcessingMessageResult: "Спасибо за покупку.",
                gtProcessingMessageState: "Ваш заказ обрабатывается.",
                gtProcessingMessageAction: "Пожалуйста, подождите немного.",
            },
            labelButtons: {
                backToShopping: "Вернуться к покупкам",
                backToCart: "В корзину",
                buyOneClick: "Купить в один клик",
                clearCart: "Очистить корзину",
                returnCart: "Вернуть корзину",
                conversionCheckout: "Оформить заказ",
                signIn: "Войти",
                checkIn: "Регистрация",
                showOnMap: "Показать на карте",
                selectIssuePoint: "Выбрать пункт выдачи",
                toCheckout: "Перейти к оформлению",
            },
            blockTitle: {
                summary: "Заказ",
                cart: "Корзина",
                checkout: "Оформление заказа",
                cartBlock: "Товары в корзине",
                login: "Контактные данные",
                loginWelcome: "Здравствуйте",
                welcomeSubtitlePrefix: "вы вошли как:",
                shipping: "Способы доставки",
                courier: "Курьерская доставка",
                pickup: "Самовывоз",
                fake: "Купить в 1 клик",
                popupPickupPoint: "Выберите удобный магазин",
                popupPartnerPickupPoint: "Выберите пункт самовывоза",
                payment: "Форма оплаты",
                contactData: "Контактные данные",
                gtProcessing: "Обработка заказа",
                comment: "Комментарий к заказу",
            },
            summary: {
                title: "Заказ",
                note: "Сроки и стоимость заказа могут быть скорректированы при согласовании заказа оператором.",
                noteOneClick: "Для покупки в один клик введите номер телефона в контактных данных.",
                titleProductsQuantity: "Товары",
                titleProductsQuantityUnits: "шт.",
                titleProductsCost: "Стоимость товаров",
                titleTotalWeight: "Суммарная масса заказа",
                titleShippingMethod: "Способ получения заказа",
                titleShippingCost: "Стоимость доставки",
                titlePickupPeriod: "Период самовывоза",
                titleCourierPeriod: "Период получения заказа",
                pickupAddressTitle: "Адрес самовывоза",
                courierAddressTitle: "Адрес доставки",
                titlePaymentMethod: "Способы оплаты",
                titleTotalCost: "Сумма заказа:",

                productsAllQuantityTitle: "Товары",
                productsAllCosTitle: "Стоимость товаров",
                productsShippingTitle: "Способ доставки",

                from: "от",
                to: "до",
            },
            previousAddress: {
                labelPrimary: "Основной",
            },
            customerAddress: {
                labelInputAddress: "Адрес доставки",
                labelInputCustomerName: "Имя получателя этого заказа",
                labelInputCustomerPhone: "Телефон для связи по поводу данного заказа",
                placeholderInputAddress: "Введите адрес доставки",
                placeholderInputCustomerName: "Имя",
                placeholderInputCustomerPhone: "Телефон",
            },
            byeOneClick: {
                labelInputEmail: "E-mail, на который будет отправлен чек",
                labelInputCustomerName: "Ваше имя",
                labelInputCustomerPhone: "Ваш телефон в формате +7 (ХХХ) ХХХ-ХХ-ХХ",
                placeholderInputEmail: "E-mail",
                placeholderInputCustomerName: "Имя",
                placeholderInputCustomerPhone: "Телефон",
            },
            shippingListItem: {
                freeCharge: "Бесплатно",
            },
            loginBlock: {
                or: "или",
                newbie: "Купить в 1 клик",
                hasAccount: "У меня есть аккаунт",
            },
            orderComment: {
                introMessage: "Если необходимо, оставьте комментарий к этому заказу",
                placeholder: "Введите комментарий здесь",
            },
        },
        load: false,
        customer: {
            name: null,
            company: null,
            phone: null,
            email: null,
            loggedIn: null,
            region: {
                country: null,
                region: null,
                city: null,
            },
            addresses: {
                selected: null,
                primary: null,
                items: null,
            },
        },
        messages: [],
        summary: {
            total: null,
            currency: null,
            address: null,
            recipient: {
                email: null,
                name: null,
                phone: null,
            },
        },
        cart: [],
        shipping: {
            selected: null,
            pickup: {},
            courier: {},
            fake: {},
        },
        endPoints: {},
        payment: {},
        order: {
            userComment: "",
        },
    },
    getters: {
        getPaymentMethod(state) {
            let payment = state.payment;
            return payment.selected ? payment.items.filter(item => item.id === payment.selected) : payment.items;
        },
    },
    mutations: {
        newEndPoints(state, endPoints) {
            state.endPoints = {...state.endPoints, [endPoints.id]: endPoints};
        },
        selectEndPoint(state, id) {
            state.endPoints.selected = id;
        },
        deleteMessage(state, messageIndex) {
            state.messages.splice(messageIndex, 1);
        },
        addMessage(state, {title, description, type, force}) {
            if (!DEBUG || !force) {
                return;
            }
            let message = {};
            message.title = title;
            message.description = description instanceof Array ? description.join("\n") : description;
            message.type = type;
            state.messages.splice(state.messages.length, 1, message);
        },
        setData(state, {data, type}) {
            if (!type) {
                type = Object.keys(data);
            }
            if (!(type instanceof Array)) {
                type = [type];
            }
            type.forEach(item => (state[item] = data[item]));
            state.load = true;
        },
        setCurrentRecipient(state, recipient) {
            state.summary.recipient = {...state.summary.recipient, ...recipient};
        },
        updateCustomer(state, customer) {
            state.customer = {...state.customer, ...customer};
        },
        setCurrentShipping(state, selected) {
            if (!selected) {
                return;
            }
            let [type, tail] = selected.split(":");
            state.shipping.selected = type;

            let isPaymentAllowed;
            if (tail) {
                state.shipping[type].selected = selected;
                isPaymentAllowed = state.shipping[type].items
                    .filter(item => item.id === selected)
                    .reduce((allow, item) => allow || item.payment.indexOf(state.payment.selected) > -1, false);
            }
            if (!isPaymentAllowed) {
                state.payment.selected = null;
            }
        },
        setCurrentPayment(state, selected) {
            state.payment.selected = selected;
        },
        setCurrentAddress(state, {address}) {
            state.summary.address = address;

            if (!state.customer || !state.customer.addresses) {
                return;
            }
            state.customer.addresses.selected = address.id;
        },
        updateDataLayer() {
            window.require(["Magento_Customer/js/customer-data", "Magento_Customer/js/section-config"], function(
                customerData,
                sectionConfig,
            ) {
                var sections = sectionConfig.getAffectedSections("one-step-checkout/ajax/updateProductQty");

                if (sections) {
                    customerData.invalidate(sections);

                    customerData.reload(sections, true);
                }
            });
        },
        setOrder: function(state) {
            state.order.customer = state.customer;
            state.order.summary = state.summary;
            state.order.cart = state.cart;
            state.order.shipping = state.shipping.selected;
            state.order.payment = state.shipping.selected;
            window.order = state.order;
        },
    },
    actions: {
        updateCustomer({state, commit}, customer) {
            let isCustomerChanged = Object.keys(customer).reduce(
                (modified, key) => modified || customer[key] !== state.customer[key],
                false,
            );
            if (!isCustomerChanged) {
                return;
            }
            commit("updateCustomer", customer);
            return axios
                .post("/one-step-checkout/ajax/setCustomer/", customer)
                .then(response => commit("setData", {data: response.data}))
                .catch(error =>
                    commit("addMessage", {
                        title: "Ошибка в updateCustomer",
                        description: error,
                        type: "error",
                    }),
                );
        },
        addNewCustomerAddress({commit}, {address}) {
            return axios
                .post("/one-step-checkout/ajax/createNewAddress", address)
                .then(response => commit("setData", {data: response.data}))
                .catch(error =>
                    commit("addMessage", {
                        title: "Ошибка в addNewCustomerAddress",
                        description: error,
                        type: "error",
                    }),
                );
        },
        getPartnerPickupPoint({commit}, {id}) {
            return axios
                .get("/one-step-checkout/ajax/getPickupPoints/" + id)
                .then(response => {
                    commit("newEndPoints", response);
                    return response;
                })
                .catch(error =>
                    commit("addMessage", {
                        title: "Ошибка в getPartnerPickupPoint",
                        description: error.message,
                        type: "error",
                    }),
                );
        },
        setCurrentRecipient({commit}, recipient) {
            commit("setCurrentRecipient", recipient);
            return axios
                .post("/one-step-checkout/ajax/setCurrentAddress/", recipient)
                .then(response => commit("setData", {data: response.data}))
                .catch(error =>
                    commit("addMessage", {
                        title: "Ошибка в setCurrentRecipient",
                        description: error.message,
                        type: "error",
                    }),
                );
        },
        setCurrentAddress({commit}, {address, sync}) {
            commit("setCurrentAddress", {address});
            if (sync) {
                return axios
                    .post("/one-step-checkout/ajax/setCurrentAddress/", address)
                    .then(response => commit("setData", {data: response.data}))
                    .catch(error =>
                        commit("addMessage", {
                            title: "Ошибка в setCurrentAddress",
                            description: error.message,
                            type: "error",
                        }),
                    );
            }
        },
        updateCartAndGetNewCart({commit}, {productId, quantity}) {
            return axios
                .post("/one-step-checkout/ajax/updateProductQty/", [
                    {
                        id: productId,
                        qty: quantity,
                    },
                ])
                .then(response => commit("setData", {data: response.data}))
                .then(() => commit("updateDataLayer"))
                .catch(error =>
                    commit("addMessage", {
                        title: "Ошибка в updateCartAndGetNewCart",
                        description: error.message,
                        type: "error",
                    }),
                );
        },
        setCurrentShipping({commit}, {shippingType, shippingId, pickupPointId, isGroup}) {
            commit("setCurrentShipping", shippingId || shippingType);
            let url;
            let data;
            if (!shippingId && shippingType) {
                url = "/one-step-checkout/ajax/setCurrentShippingType/";
                data = {
                    type: shippingType,
                };
            } else if (shippingId) {
                if (isGroup) {
                    url = "/one-step-checkout/ajax/setCurrentPickupPoint/";
                    data = {
                        shipping_id: shippingId,
                        id: pickupPointId,
                    };
                } else {
                    url = "/one-step-checkout/ajax/setCurrentShipping/";
                    data = {
                        id: shippingId,
                    };
                }
            } else {
                return;
            }
            return axios
                .post(url, data)
                .then(response => commit("setData", {data: response.data}))
                .catch(error =>
                    commit("addMessage", {
                        title: "Ошибка в setCurrentShipping",
                        description: error.message,
                        type: "error",
                    }),
                );
        },
        setCurrentPayment({commit}, {paymentId}) {
            if (!paymentId) {
                return;
            }
            commit("setCurrentPayment", paymentId);
            return axios
                .post("/one-step-checkout/ajax/setCurrentPayment/", {
                    id: paymentId,
                })
                .then(response => commit("setData", {data: response.data}))
                .catch(error =>
                    commit("addMessage", {
                        title: "Ошибка в setCurrentPayment",
                        description: error.message,
                        type: "error",
                    }),
                );
        },
        getInfo({commit}) {
            return axios
                .get("/one-step-checkout/ajax/getInfo")
                .then(response => commit("setData", {data: response.data}))
                .catch(error =>
                    commit("addMessage", {
                        title: "Ошибка в getInfo",
                        description: error.message,
                        type: "error",
                    }),
                );
        },
        placeOrder({state, commit}) {
            return axios
                .post("/one-step-checkout/ajax/createOrder", {order: state.order})
                .then(response => response.data)
                .then(response => window.location.replace(response.redirect))
                .catch(error => {
                    if (error.response.status >= 500) {
                        commit("addMessage", {
                            title: `Невозможно оформить заказ (Статус: ${error.response.status})`,
                            description: "Попробуйте снова через некоторое время, или свяжитесь с нами по телефону",
                            type: "error",
                            force: true,
                        });
                    } else if (error.response.status >= 400) {
                        commit("addMessage", {
                            title: `Невозможно оформить заказ (Статус: ${error.response.status})`,
                            description: error.response.data.error_messages,
                            type: "error",
                            force: true,
                        });
                    }
                    router.replace({name: "checkout"});
                });
        },
        updateCustomerData({commit}, {sections}) {
            try {
                window.require(["Magento_Customer/js/customer-data"], function(customerData) {
                    customerData.reload(sections, true);
                });
            } catch (error) {
                commit("addMessage", {
                    title: "Ошибка в updateCustomerData",
                    description: error.message,
                    type: "error",
                });
            }
        },
    },
});
