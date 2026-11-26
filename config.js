// config.js - Credenciales de Heaven Vision en la nube
const SUPABASE_URL = "https://padusmshmpzfwaqtyefo.supabase.co/";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhZHVzbXNobXB6ZndhcXR5ZWZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc3NDI4ODIsImV4cCI6MjA5MzMxODg4Mn0.bjYshE2w-N4BsNXzt0wycGy90TTIF8XxH04UJd-GN04";

// Inicializamos el cliente para todo el sitio
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// ==========================================
// GUARDIÁN DE RUTAS (Protección de páginas)
// ==========================================
supabaseClient.auth.getSession().then(({ data }) => {
    const session = data.session;
    // Verifica si estamos en la página de login (index.html o la raíz)
    const isLoginPage = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/');

    // Si NO hay sesión y la persona intenta entrar a una página interna, la pateamos al Login
    if (!session && !isLoginPage) {
        window.location.replace('index.html');
    }

    // Si SÍ hay sesión y la persona está en la pantalla de Login, la pasamos directo al Dashboard
    if (session && isLoginPage) {
        window.location.replace('dashboard.html');
    }
});

// ==========================================
// FUNCIÓN PARA DESTRUIR EL PASE VIP REALMENTE
// ==========================================
async function cerrarSesion() {
    await supabaseClient.auth.signOut(); // Esto destruye el token en Supabase
    window.location.replace('index.html');
}