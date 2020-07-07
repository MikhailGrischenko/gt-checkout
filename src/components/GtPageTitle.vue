<template>
    <h1 class="page-title">{{ title }}</h1>
</template>

<script>
export default {
    name: "GtPageTitle",
    props: {
        title: String,
    },
};
</script>
<style lang="less">
.page-title {
    padding: 0 @grid-half-gutter-phone-s;
}

@media (min-width: @screen__gta-tablet-s) {
    .page-title {
        padding: 0 @grid-half-gutter-tablet-m;
    }
}

@media (min-width: @screen__gta-desktop-xs) {
    .page-title {
        padding: 0 @grid-half-gutter-desktop-xs;
    }
}

@media (min-width: @screen__gta-desktop-s) {
    .page-title {
        padding: 0 @grid-half-gutter-desktop-s;
    }
}

@media (min-width: @screen__gta-desktop-m) {
    .page-title {
        padding: 0 @grid-half-gutter-desktop-m;
    }
}

@media (min-width: @screen__gta-desktop-l) {
    .page-title {
        padding: 0 @grid-half-gutter-desktop-l;
    }
}

@media (min-width: @screen__gta-desktop-xl) {
    .page-title {
        padding: 0 @grid-half-gutter-desktop-xl;
    }
}
</style>

<style scoped>
.page-title {
    text-align: center;
}
</style>
