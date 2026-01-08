<template>
  <div
    class="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-6 text-center text-white"
  >
    <p class="text-9xl font-extrabold tracking-widest opacity-90">404</p>

    <h2 class="mb-3 text-2xl font-semibold md:text-3xl">Page not found</h2>

    <p class="mb-8 max-w-md text-slate-300">Sorry, the page you’re looking for doesn’t exist or has been moved.</p>

    <RouterLink
      to="/"
      class="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-slate-900 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      Go back home
    </RouterLink>
  </div>
</template>
