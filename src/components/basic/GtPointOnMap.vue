<template>
    <div class="point-on-map">
        <ul class="point-on-map__list">
            <gt-point-list-item
                v-for="(endPoint, index) in endPoints.items"
                :key="index"
                :point="endPoint"
                :selected="endPoints.selected === endPoint.id"
            ></gt-point-list-item>
        </ul>
        <div class="point-on-map__view-box">
            <span>map</span>
            <!--Map :geo-markers="endPoints"></gt-map-->
        </div>
    </div>
</template>

<script>
import GtPointListItem from "./GtPointListItem";

export default {
    name: "GtPointOnMap",
    components: {GtPointListItem},
    props: {
        endPoints: Object,
    },
};
</script>

<style scoped lang="less">
.point-on-map {
    display: flex;
    flex: 1 1 100%;
}

.point-on-map__list {
    flex: 1 1 30%;
    padding: 0;
    margin: 0;
    overflow: auto;
}

.point-on-map__view-box {
    flex: 1 1 70%;
    align-self: stretch;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    border: @border-extra;
    background-color: @color-bg-extra-light;
}
</style>
