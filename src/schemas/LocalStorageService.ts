
type LS = 
  'token' | 
  'listSelected' | 
  'position' |
  'directionSelected' |
  'tipoPago'

export class LocalStorageService {
  
 setItem(key: LS, value: any): void {
   localStorage.setItem(key, JSON.stringify(value));
 }

 getItem<T>(key: LS);
 getItem<T>(key: string, otherwise: T): T;
 getItem<T>(key: LS, otherwise?: T): T | null {
   const data: string | null = localStorage.getItem(key);

   if (data !== null) {
     return JSON.parse(data);
   }

   if (otherwise) {
     return otherwise;
   }

   return null;
 }
}