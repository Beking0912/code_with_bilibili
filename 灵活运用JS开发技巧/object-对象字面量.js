const env = "prod";
const link = {
    dev: "Development Address",
    test: "Testing Address",
    prod: "Production Address"
}[env];
// link => "Production Address"

// 获取环境变量时必用此方法