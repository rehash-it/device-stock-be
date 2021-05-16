module.exports = {
  jwtPrivateKey : process.env.JWT_SECRET||'dsfsdfkasdjfkasdhfkashdflashfdfsdaf',
  dburl:process.env.DATABASE_URL||'mongodb://localhost:27017/device-stock',
  port:process.env.PORT || 9000 
}