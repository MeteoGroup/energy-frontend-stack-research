<widget-header>
    <i class="fa fa-close" onclick={ this.parent.remove }></i>
    <div>{opts.title}</div>
    <span>ID: {opts.wid}</span>

    <style scoped>
        :scope > .fa-close {
            float: right;
            font-size: 28px;
            margin: 5px 10px 0 0;
            color: #D32F2F;
            cursor: pointer;
        }
        :scope > .fa-close:hover {
            color: #fff;
        }
        :scope > div {
            display: block;
            font-size: 30px;
            padding: 10px 10px 5px 10px;
        }
        :scope > span {
            display: block;
            font-size: 16px;
            padding-left: 11px;
        }
    </style>
</widget-header>