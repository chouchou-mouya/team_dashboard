<template>
    <div>
		<header>
			<div class="logo">
				<img src="static/images/logo.png">
			</div>
			<div class="admin">
				<div class="user_name">Hi {{username}}</div>
				<div class="signBtn"><a href="#"><button>登出</button></a></div>
			</div>
		</header>
	</div>
</template>

<script>
    export default {
		name:"myheader",
		data(){
			return{
				username:"admin",
			};
		},
    };
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

	header .logo{
		margin:0 0 0 30px;
	}

	header .admin{
		font-size: 15px;
		color: #363636;
	}

	header .admin .user_name{
		margin-right: 15px;
	}

	.signBtn{
		font-size: 15px;
		padding:5px 15px;
		border-radius: 20px;
		background: #2caadf;
		color: #fff;
		cursor: pointer;
		transition: 0.3s;
	}
	
		.signBtn:hover{
			background:#106082;	
		}

</style>