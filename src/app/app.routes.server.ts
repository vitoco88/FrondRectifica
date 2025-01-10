import { RenderMode, ServerRoute } from '@angular/ssr';

/*
export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender
  },
  
];
*/

export const serverRoutes: ServerRoute[] = [
  {
    path: 'Edit/:tCodEstudiante',  // Ruta dinámica
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      // Asegúrate de que la función devuelva una Promesa
      return [
        { tCodEstudiante: '123' },  // Parámetro para la ruta
        { tCodEstudiante: '456' }   // Otro parámetro
      ];
    }
  },
  // Otras rutas
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
