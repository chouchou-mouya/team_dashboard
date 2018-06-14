<template>
    <div>ttttt
    <header>111
        <div class="logo">
            <img src="static/images/logo.png">
        </div>
        <div class="admin">
            <div class="user_name">Hi [[username]]</div>
            <div><a href="#"><button>登出</button></a></div>
        </div>
    </header>
	</div>
</template>

<script>
    export default {
        name:"web_header",
    }
</script>

<style>
	/*===header===*/
	header{
		/* margin:30px 0 0 0; */
		position: relative;
		top: 30px;
		display: flex;
		justify-content:space-between;
	}
	
	header .logo,
	header .admin{
		display: flex;
		align-items:center;
	}
	
	header .admin{
		font-size: 15px;
		color: #363636;
	}

	header .admin .user_name{
		margin-right: 15px;
	}


</style>