<template>
    <div class="page-lu">
        <div class="lu-image">
            <img src="./images/user-info.jpg" />
            <div class="lu-info">
                <p>There is no tree to cover the sky</p>
                <p>only one thing to fall</p>
            </div>
        </div>
        <div class="lu-gm-conformity">
            <gm-conformity :list="conformityOpt.list"></gm-conformity>
        </div>
        <div class="lu-swiper">
            <mt-swipe :auto="3000">
                <mt-swipe-item v-for="(item, index) in swiperOpt.list" :key="index">
                    <img :src="imgSrcHdl(item.url)" />
                </mt-swipe-item>
            </mt-swipe>
        </div>
        <div class="lu-user-info">
            <h4>About Me</h4>
            <p>Name</p>
            <span>鲁宽宽</span>
            <p>School</p>
            <span>南昌大学</span>
            <p>Job</p>
            <span>web前端</span>
            <p>Work in</p>
            <span>度小满金融</span>
        </div>
        <gm-footer></gm-footer>
    </div>
</template>

<script>
import { Toast } from "mint-ui";
import gmConformity from "@/components/Conformity/index.vue";
import gmFooter from "@/components/Footer/index.vue";
import apiConfig from "@/apiconfig.js";
import request from "@/assets/request.js";
export default {
    name: "PageLu",
    data() {
        return {
            // 从众条的数据
            conformityOpt: {
                list: [
                    {
                        title: "随笔-庚子春",
                        details: "社会未因你而变，你却随着社会在变"
                    },
                    {
                        title: "随笔-庚子春末",
                        details: "成年人的无奈与尴尬只因不够强大"
                    },
                    {
                        title: "感悟-庚子春末",
                        details: "提升自我，保持在这个社会竞争的底子"
                    },
                    {
                        title: "致敬-庚子春",
                        details: "白衣天使、烈火英雄"
                    }
                ]
            },
            swiperOpt: {
                list: [
                    {
                        url: "swiper1.jpg"
                    },
                    {
                        url: "swiper2.jpg"
                    },
                    {
                        url: "swiper3.jpg"
                    },
                    {
                        url: "swiper4.jpg"
                    }
                ]
            }
        };
    },
    components: {
        gmConformity,
        gmFooter
    },
    created() {
        this.getIndex();
    },
    methods: {
        // 获取mock数据
        getIndex() {
            request(apiConfig.getPageLu, {
                data: { a: 1 }
            }).then(res => {
                console.log(res);
            })
        },
        // 图片路径拼接
        imgSrcHdl(data) {
            return require("./images/" + data);
        }
    }
};
</script>
<style lang="scss" scoped>
@import "~@/assets/css/app.scss";
.page-lu {
    width: 100%;
    box-sizing: border-box;
    padding: 0 40px;
    .lu-image {
        position: relative;
        width: 670px;
        height: 400px;
        &::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: url("./images/user-info.jpg") center no-repeat;
            background-size: cover;
            filter: blur(6px);
        }
        img {
            position: absolute;
            top: 30px;
            left: 30px;
            width: 216px;
            height: 340px;
        }
        .lu-info {
            position: absolute;
            top: 100px;
            left: 280px;
            font-size: $fontSize22;
            font-weight: 700;
            color: $fontWhite;
            p {
                margin-top: 10px;
            }
        }
    }
    .lu-gm-conformity {
        margin: 40px 0;
        color: $fontSecondary;
    }
    .lu-swiper {
        width: 100%;
        height: 160px;
        img {
            display: block;
            width: 100%;
            height: 100%;
        }
    }
    .lu-user-info {
        margin-top: 20px;
        padding: 40px 0;
        background: $borderThree;
        h4 {
            font-size: $fontSize30;
            font-weight: bold;
            text-align: center;
            margin-bottom: 60px;
            text-shadow: 0 1px 0 #ccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9, 0 5px 0 #aaa, 0 6px 1px rgba(0,0,0,0.1), 0 0 5px rgba(0,0,0,0.1),0 1px 3px rgba(0,0,0,0.3),0 3px 5px rgba(0,0,0,0.2),0 5px 10px rgba(0,0,0,0.25);
        }
        p {
            padding-left: 10px;
            margin: 20px 0;
            margin-left: 10px;
            font-size: $fontSize26;
            text-shadow:0 0 3px $colorSpare1;
            line-height: normal;
            border-left: 4px solid $colorSpare1;
        }
        span {
            padding-left: 40px;
        }
    }
}
</style>
