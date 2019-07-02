<template> 
    <div>
        <nav aria-label="Page navigation example">
            <ul class="pagination">
                <li class="page-item" :class="{'disabled': !pageprops.has_pre}">
                    <a class="page-link" href="#" aria-label="Previous" @click.prevent="getProducts(pageprops.current_page - 1)">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                <li class="page-item" v-for="page in pageprops.total_pages" :key="page"
                    :class="{'active': pageprops.current_page == page}">
                    <a class="page-link" href="#" @click="getProducts(page)">{{ page }}</a>
                </li>
                <li class="page-item" :class="{'disabled': !pageprops.has_next}">
                    <a class="page-link" href="#" aria-label="Next" @click.prevent="getProducts(pageprops.current_page + 1)">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
export default {
    props: ["pageprops"],
    methods: {
        getProducts(page = 1) {
            this.$emit("getPages", page);
        }
    }
}
</script>
