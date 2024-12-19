export default defineEventHandler(async (event) => {
   const body = await readBody(event);
 
   const passportConfig = useRuntimeConfig().passport;
 
   // Vérifie que l'information requise est présente
   if (!body.email || !body.password) {
     throw createError({ statusCode: 400, message: 'Missing credentials' });
   }
 
   // Appel à l'API Laravel Passport
   const response = await $fetch(`${passportConfig.baseUrl}/oauth/token`, {
     method: 'POST',
     body: {
       grant_type: 'password',
       client_id: passportConfig.clientId,
       client_secret: passportConfig.clientSecret,
       username: body.email,
       password: body.password,
       scope: '',
     },
   });
 
   return response; // Renvoie le token au front-end
 });
 