<template>
    <div class="point-list-item" @click="chooseItem" :class="{'point-list-item--checked': selected}">
        <div class="point-list-item__marker"></div>
        <div class="point-list-item__main">
            <div class="point-list-item__header">
                <h4 class="point-list-item__title">{{ point.name }}</h4>
            </div>
            <div class="point-list-item__description">
                <div class="point-list-item__description-item">{{ point.description }}</div>
            </div>
        </div>
        <div class="point-list-item__checker" :class="{'point-list-item__checker--checked': selected}">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M23.3567 3.19854C22.4982 2.34007 21.1072 2.34007 20.2488 3.19854L7.17758
                        16.2697L3.70197 13.2841C2.85523 12.4373 1.48254 12.4373 0.635053 13.2841C-0.211684
                        14.1308 -0.211684 15.5042 0.635053 16.351L5.82763 20.8111C6.67437 21.6578 8.04706
                        21.6578 8.89455 20.8111C8.97953 20.7261 9.05058 20.6316 9.1187 20.5371C9.13113 20.5254
                        9.14505 20.5173 9.15752 20.5056L23.3567 6.30569C24.2144 5.44797 24.2144 4.05625
                        23.3567 3.19854Z"
                    fill="#1C6445"
                />
            </svg>
        </div>
    </div>
</template>

<script>
export default {
    name: "GtPointListItem",
    props: {
        point: Object,
        selected: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        chooseItem() {
            this.$store.commit("selectEndPoint", this.point.id);
        },
    },
};
</script>

<style scoped lang="less">
.point-list-item {
    color: rgba(0, 0, 0, 0.8);
    padding: 0;
    margin: 1px 2px 4px 2px;
    display: flex;
    transition: all 0.1s ease-in-out;
    border: @border-transparent;
    border-radius: 1px;
    box-sizing: content-box;
}

.point-list-item--checked {
    border: @border-extra;
}

.point-list-item:hover,
.point-list-item:focus {
    box-shadow: @shadow-corporate-lite;
}

.point-list-item__marker {
    flex: 0 0 4px;
}

.point-list-item:hover .point-list-item__marker,
.point-list-item:focus .point-list-item__marker {
    background-color: @color-corporate;
}

.point-list-item__checker {
    flex: 0 0 0.9em;
    padding: 0.7em;
    display: flex;
    justify-content: center;
    align-items: center;
}

.point-list-item__checker svg {
    width: 0.9em;
    height: 0.9em;
    display: none;
}

.point-list-item__checker--checked svg {
    display: block;
}

.point-list-item__main {
    flex: 1 1 auto;
    padding: 0 0.5em;
}

.point-list-item__header {
    display: flex;
    align-items: baseline;
    margin: 0.2em 0 0 0;
}

.point-list-item__title {
    padding: 0;
    margin: 0 0.3em 0.3em 0;
    font-size: 1em;
    font-weight: normal;
}

.point-list-item__subtitle {
    padding: 0;
    margin: 0.1em 0 0.2em;
    font-size: 0.8em;
    font-weight: 600;
}

.point-list-item:hover .point-list-item__header {
    color: rgba(0, 100, 70, 1);
}

.point-list-item__description {
    margin: 0 0 0.2em 0;
}

.point-list-item__description-item {
    font-size: 0.8em;
}
</style>
