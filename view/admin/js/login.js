window.onload = function () {
    let vm = new Vue({
        el: '#app',
        data(){
            return {
                ruleForm: {
                    username: '',
                    passwd: ''
                },
                errInfo:{
                    username:'',
                    passwd:''

                },
                bt:true,
                rules: {
                    username: [{
                            required: true,
                            message: '请输入账号',
                            trigger: 'blur'
                        }
                    ],
                    passwd: [{
                            required: true,
                            message: '请输入密码',
                            trigger: 'change'
                        },
                        {
                            min: 6,
                            max: 16,
                            message: '长度在 6 到 16 个字符',
                            trigger: 'blur'
                        }
                    ]
                }
            }
        } ,
        methods: {
            submitForm(formName) {
                let This =this;
                This.errInfo.username = '';
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        //一切OK就开始登录处理
                        axios({
                            method: 'post',
                            url: './loginsubmit',
                            /*
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            },
                            */
                            data: Qs.stringify(This.ruleForm),
                            responseType: 'json'
                        }).then(function (res) {
                            console.log(res.data.r);
                            if(res.data.r == 'username_no_exist'){
                                This.errInfo.username = '账号不存在';
                            }else if(res.data.r == 'pw_error'){
                                This.errInfo.passwd = '密码错误';
                            }else if(res.data.r == 'ok'){
                                window.location.href = '/admin/index';
                            }else{
                                This.$message('未知错误，请刷新页面后重新操作');
                            }
                        }).catch(function (err) {
                            console.log(err);
                        });
                    } else {
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    })
}