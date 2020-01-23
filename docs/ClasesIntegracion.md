## Múltiples versiones de Node con NVMRC

  En muchas ocaciones pasa que estas saltando entre proyectos y cada vez se hace mas necesario estar saltando entre versiones de node por que en la vida real, no todos
  los proyectos estan funcionando con la ultima versión LTS de Node. 

  NVM o _Node Version Manager_ nos ayuda a instalar versiones espeficifas de node sin afectar la version global del sistema. 

  Para poder usarlo solo debemos hacer 2 cosas:

    1.- Instalarlo
    2.- Implementarlo en nuestro proyecto

  1.- Para instalarlo solo debemos ir al repo de github y seguir las instrucciones en https://github.com/nvm-sh/nvm

  Es solo bajar el script que lo instala y ya. 

  2.- Para implementarlo es mas sencillo aun, lo unico que debemos hacer es en la base de nuestro proyecto creamos un archivo llamado `.nvmrc` y alli adentro vas a poner la version de Node que quieras usar en tu proyecto.

  Por ejemplo, en PlatziVideo estaremos usando la ultima LTS de Node. Y esa es la 12.4.1 en este momento.

  Luego, vamos a nuestra consola y por ultimo ejecutamos `nvm i`

  Si queremos probar la version que estamos usando, solo ejecutamos `node -v` y listo. 

