<?php


return [
    'navigation' => [
        'menu' => 'Menú de Navegación',
        'items' => [
            'dashboard' => 'Panel',
            'users' => 'Usuarios',
            'floors' => 'Pisos',
            'zones' => 'Zonas',
            'bookshelves' => 'Estanterías',
            'books' => 'Libros',
            'loans' => 'Préstamos',
            'reservations' => 'Reservas',
            'repository' => 'Repositorio',
            'documentation' => 'Documentación',

        ],
    ],
    'user_menu' => [
        'settings' => 'Configuración',
        'logout' => 'Cerrar sesión',
    ],
    'auth' => [
        'failed' => 'Estas credenciales no coinciden con nuestros registros.',
        'throttle' => 'Demasiados intentos de inicio de sesión. Por favor, inténtalo de nuevo en :seconds segundos.',
    ],
    'settings' => [
        'title' => 'Configuración',
        'description' => 'Gestiona tu perfil y configuración de cuenta',
        'navigation' => [
            'profile' => 'Perfil',
            'password' => 'Contraseña',
            'appearance' => 'Apariencia',
            'languages' => 'Idiomas',
        ],
        'profile' => [
            'title' => 'Configuración del perfil',
            'information_title' => 'Información del perfil',
            'information_description' => 'Actualiza tu nombre y dirección de correo electrónico',
            'name_label' => 'Nombre',
            'name_placeholder' => 'Nombre completo',
            'email_label' => 'Dirección de correo',
            'email_placeholder' => 'Dirección de correo',
            'unverified_email' => 'Tu dirección de correo no está verificada.',
            'resend_verification' => 'Haz clic aquí para reenviar el correo de verificación.',
            'verification_sent' => 'Se ha enviado un nuevo enlace de verificación a tu dirección de correo.',
            'save_button' => 'Guardar',
            'saved_message' => 'Guardado',
        ],
        'password' => [
            'title' => 'Configuración de contraseña',
            'update_title' => 'Actualizar contraseña',
            'update_description' => 'Asegúrate de que tu cuenta utilice una contraseña larga y aleatoria para mantenerse segura',
            'current_password_label' => 'Contraseña actual',
            'current_password_placeholder' => 'Contraseña actual',
            'new_password_label' => 'Nueva contraseña',
            'new_password_placeholder' => 'Nueva contraseña',
            'confirm_password_label' => 'Confirmar contraseña',
            'confirm_password_placeholder' => 'Confirmar contraseña',
            'save_button' => 'Guardar contraseña',
            'saved_message' => 'Guardado',
        ],
        'appearance' => [
            'title' => 'Configuración de apariencia',
            'description' => 'Actualiza la configuración de apariencia de tu cuenta',
            'modes' => [
                'light' => 'Claro',
                'dark' => 'Oscuro',
                'system' => 'Sistema'
            ]
        ],
        'languages' => [
            'title' => 'Configuración de idioma',
            'description' => 'Cambia tu idioma preferido',
        ],
    ],
    'validation' => [
            'required' => 'El campo :attribute es obligatorio.',
            'email' => 'El campo :attribute debe ser una dirección de correo válida.',
            'min' => [
                'string' => 'El campo :attribute debe tener al menos :min caracteres.',
            ],
            'max' => [
                'string' => 'El campo :attribute no debe tener más de :max caracteres.',
            ],
            'unique' => 'El campo :attribute ya ha sido tomado.',
            'confirmed' => 'El campo :attribute no coincide.',
    ],
    'common' => [
        'buttons' => [
            'cancel' => 'Cancelar',
            'delete' => 'Eliminar',
            'close' => 'Cerrar',
        ],
        'filters'=> [
            'title' => 'Filtros',
            'clear' => 'Limpiar',
            'results' => 'Número de resultados: '
        ],
        'delete_dialog' => [
            'success' => 'Eliminado correctamente',
        ],
        'showing_results' => 'Mostrando :from a :to de :total resultados',
        'pagination' => [
            'previous' => 'Anterior',
            'next' => 'Siguiente',
            'first' => 'Primero',
            'last' => 'Último',
        ],
        'per_page' => 'Por página',
        'no_results' => 'No hay resultados',
    ],
    'users' => [
        'title' => 'Usuarios',
        'description' => 'Gestiona los usuarios del sistema',
        'create' => 'Crear Usuario',
        'edit' => 'Editar Usuario',
        'fields' => [
            'name' => 'Nombre',
            'email' => 'Email',
            'password' => 'Contraseña',
            'password_optional' => 'Contraseña (opcional)',
            'created_at' => 'Fecha de creación',
            'actions' => 'Acciones',
        ],
        'columns' => [
            'name' => 'Nombre',
            'email' => 'Email',
            'created_at' => 'Fecha de creación',
            'actions' => 'Acciones',
        ],
        'filters' => [
            'search' => 'Buscar',
            'name' => 'Nombre del usuario',
            'email' => 'Email del usuario',
        ],
        'placeholders' => [
            'name' => 'Nombre completo del usuario',
            'email' => 'correo@ejemplo.com',
            'password' => 'Contraseña segura',
            'search' => 'Buscar usuarios...',
        ],
        'buttons' => [
            'new' => 'Nuevo Usuario',
            'edit' => 'Editar',
            'save' => 'Guardar',
            'update' => 'Actualizar',
            'cancel' => 'Cancelar',
            'delete' => 'Eliminar',
            'deleting' => 'Eliminando...',
            'saving' => 'Guardando...',
            'retry' => 'Reintentar',
        ],
        'delete' => [
            'title' => '¿Estás seguro?',
            'description' => 'Esta acción no se puede deshacer. Se eliminará permanentemente el usuario del sistema.',
        ],
        'delete_dialog' => [
            'title' => '¿Estás seguro?',
            'description' => 'Esta acción no se puede deshacer. Se eliminará permanentemente el usuario del sistema.',
            'success' => 'Eliminado correctamente ;)',
        ],
        'deleted_error' => 'Error al eliminar el usuario',
        'no_results' => 'No hay resultados.',
        'error_loading' => 'Error al cargar los usuarios. Por favor, inténtalo de nuevo.',
        'showing_results' => 'Mostrando :from a :to de :total resultados',
        'pagination' => [
            'previous' => 'Anterior',
            'next' => 'Siguiente',
        ],
        'role' => [
            'main' => 'Rol Principal',
            'select' => 'Selecciona un rol',
            'admin' => 'Administrador',
            'client' => 'Cliente',
        ],
        'permissions' => [
            'title' => 'Permisos específicos',
            'users' => [
                'title' => 'Usuarios',
                'view' => 'Ver usuarios',
                'create' => 'Crear usuarios',
                'edit' => 'Editar usuarios',
                'delete' => 'Eliminar usuarios'
            ],
            'products' => [
                'title' => 'Productos',
                'view' => 'Ver productos',
                'create' => 'Crear productos',
                'edit' => 'Editar productos',
                'delete' => 'Eliminar productos'
            ],
            'reports' => [
                'title' => 'Reportes',
                'view' => 'Ver reportes',
                'export' => 'Exportar reportes',
                'print' => 'Imprimir reportes'
            ],
            'config' => [
                'title' => 'Configuración',
                'access' => 'Acceso a configuración',
                'modify' => 'Modificar configuración'
            ]
        ],
        'history'=>[
            'title'=>'Historial',
            'has_reserved'=>'El usuario ha reservado el libro ',
            'has_loan'=>'El usuario tiene prestado el libro ',
            'is_overdue'=>'El usuario todavía no ha devuelto el libro ',
            'returned_overdue'=>'El usuario ha devuelto tarde el libro ',
            'has_returned'=>'El usuario ha devuelto a tiempo el libro ',

        ]
    ],
    'genres'=>[
        'names'=>[
            'classic_literature' => 'Literatura clásica',
            'sci-fi' => 'Ciencia ficción',
            'medieval' => 'Medieval',
            'art' => 'Arte',
            'science' => 'Ciencia',
            'maths' => 'Matemáticas',
            'poem' => 'Poema',
            'fantasy' => 'Fantasía',
            'technician' => 'Técnico',
            'tale' => 'Cuento',
        ],
    ],
    'floors'=>[
        'title'=>'Pisos',
        'description' => 'Gestiona los pisos del sistema',
        'create' => 'Crear Piso',
        'edit' => 'Editar Piso',
        'fields' => [
            'name' => 'Piso',
            'actions' => 'Acciones',
        ],
        'columns' => [
            'name' => 'Nombre del piso',
            'created_at' => 'Fecha de creación',
            'actions' => 'Acciones',
        ],
        'placeholders' => [
            'name' => 'Nombre del piso',
            'search' => 'Buscar pisos...',
        ],
        'filters' => [
            'search' => 'Buscar',
            'name' => 'Nombre del piso',
        ],
        'buttons' => [
            'new' => 'Nuevo Piso',
            'edit' => 'Editar',
            'save' => 'Guardar',
            'update' => 'Actualizar',
            'cancel' => 'Cancelar',
            'delete' => 'Eliminar',
            'deleting' => 'Eliminando...',
            'saving' => 'Guardando...',
            'retry' => 'Reintentar',
        ],
        'delete' => [
            'title' => '¿Estás seguro?',
            'description' => 'Esta acción no se puede deshacer. Se eliminará permanentemente el piso del sistema.',
        ],
        'delete_dialog' => [
            'title' => '¿Estás seguro?',
            'description' => 'Esta acción no se puede deshacer. Se eliminará permanentemente el piso del sistema.',
            'success' => 'Eliminado correctamente ;)',
        ],
        'deleted_error' => 'Error al eliminar el piso',
        'no_results' => 'No hay resultados.',
        'error_loading' => 'Error al cargar los pisos. Por favor, inténtalo de nuevo.',
        'showing_results' => 'Mostrando :from a :to de :total resultados',
        'pagination' => [
            'previous' => 'Anterior',
            'next' => 'Siguiente',
        ],
    ],
    'zones'=>[
        'title'=>'Zonas',
        'create' => 'Crear Zona',
        'description' => 'Gestiona las zonas del sistema',
        'edit' => 'Editar Zona',
        'fields' => [
            'name' => 'Zona',
            'actions' => 'Acciones',
        ],
        'columns' => [
            'name' => 'Nombre de la zona',
            'floor' => 'Piso en el que se encuentra',
            'created_at' => 'Fecha de creación',
            'actions' => 'Acciones',
        ],
        'placeholders' => [
            'name' => 'Nombre de la zona',
            'floor' => 'Nombre del piso',
            'search' => 'Buscar zonas...',
        ],
        'filters' => [
            'search' => 'Buscar',
            'name' => 'Nombre de la zona',
            'floor' => 'Nombre del piso',
        ],
        'buttons' => [
            'new' => 'Nueva zona',
            'edit' => 'Editar',
            'save' => 'Guardar',
            'update' => 'Actualizar',
            'cancel' => 'Cancelar',
            'delete' => 'Eliminar',
            'deleting' => 'Eliminando...',
            'saving' => 'Guardando...',
            'retry' => 'Reintentar',
        ],
        'delete' => [
            'title' => '¿Estás seguro?',
            'description' => 'Esta acción no se puede deshacer. Se eliminará permanentemente la zona del sistema.',
        ],
        'delete_dialog' => [
            'title' => '¿Estás seguro?',
            'description' => 'Esta acción no se puede deshacer. Se eliminará permanentemente la zona del sistema.',
            'success' => 'Eliminado correctamente ;)',
        ],
        'deleted_error' => 'Error al eliminar la zona',
        'no_results' => 'No hay resultados.',
        'error_loading' => 'Error al cargar las zonas. Por favor, inténtalo de nuevo.',
        'showing_results' => 'Mostrando :from a :to de :total resultados',
        'pagination' => [
            'previous' => 'Anterior',
            'next' => 'Siguiente',
        ],
    ],
    'bookshelves'=>[
        'title'=>'Estanterías',
        'description' => 'Gestiona las estanterías del sistema',
        'create' => 'Crear Estantería',
        'edit' => 'Editar Estantería',
        'fields' => [
            'number' => 'Número de estantería',
            'capacity' => 'Capacidad de la estantería',
            'floor' => 'Piso donde se encuentra',
            'zone' => 'Zona donde se encuentra'
        ],
        'columns' => [
            'number' => 'Número de estantería',
            'capacity' => 'Capacidad de la estantería',
            'zone' => 'Zona en la que se encuentra',
            'created_at' => 'Fecha de creación',
            'actions' => 'Acciones',
        ],
        'placeholders' => [
            'number' => 'Número de estantería',
            'capacity' => 'Capacidad de la estantería',
            'floor' => 'Piso donde se encuentra',
            'zone' => 'Zona donde se encuentra'
        ],
        'filters' => [
            'search' => 'Buscar',
            'number' => 'Número de estantería',
            'capacity' => 'Capacidad de la estantería',
            'floor' => 'Piso donde se encuentra',
            'zone' => 'Zona donde se encuentra'
        ],
        'buttons' => [
            'new' => 'Nueva estantería',
            'edit' => 'Editar',
            'save' => 'Guardar',
            'update' => 'Actualizar',
            'cancel' => 'Cancelar',
            'delete' => 'Eliminar',
            'deleting' => 'Eliminando...',
            'saving' => 'Guardando...',
            'retry' => 'Reintentar',
        ],
        'delete' => [
            'title' => '¿Estás seguro?',
            'description' => 'Esta acción no se puede deshacer. Se eliminará permanentemente la estantería del sistema.',
        ],
        'delete_dialog' => [
            'title' => '¿Estás seguro?',
            'description' => 'Esta acción no se puede deshacer. Se eliminará permanentemente la estantería del sistema.',
            'success' => 'Eliminado correctamente ;)',
        ],
        'deleted_error' => 'Error al eliminar la estantería',
        'no_results' => 'No hay resultados.',
        'error_loading' => 'Error al cargar las estanterías. Por favor, inténtalo de nuevo.',
        'showing_results' => 'Mostrando :from a :to de :total resultados',
        'pagination' => [
            'previous' => 'Anterior',
            'next' => 'Siguiente',
        ],
    ],
    'books'=>[
        'title'=>'Libros',
        'description' => 'Gestiona los libros del sistema',
        'create' => 'Crear Libro',
        'edit' => 'Editar Libro',
        'fields' => [
            'title' => 'Título del libro',
            'author' => 'Autor del libro',
            'pages' => 'Páginas del libro',
            'editorial' => 'Editorial',
            'ISBN' => 'ISBN',
            'genre' => 'Género',
            'bookshelf' => 'Estantería en la que se encuentra',
            'image' => 'Imagen de portada'
        ],
        'columns' => [
            'title' => 'Título',
            'author' => 'Autor',
            'pages' => 'Páginas',
            'editorial' => 'Editorial',
            'ISBN' => 'ISBN',
            'genre' => 'Género',
            'bookshelf' => 'Estantería en la que se encuentra',
            'created_at' => 'Fecha de creación',
            'actions' => 'Acciones',
        ],
        'placeholders' => [
            'title' => 'Título del libro',
            'author' => 'Autor del libro',
            'pages' => 'Páginas del libro',
            'editorial' => 'Editorial',
            'ISBN' => 'ISBN',
            'genre' => 'Género',
            'bookshelf' => 'Estantería en la que se encuentra',
            'image' => 'Imagen de portada',
            'search' => 'Buscar libros...',
        ],
        'filters' => [
            'search' => 'Buscar',
            'title' => 'Título del libro',
            'author' => 'Autor del libro',
            'pages' => 'Páginas del libro',
            'editorial' => 'Editorial',
            'ISBN' => 'ISBN',
            'genre' => 'Género',
            'bookshelf' => 'Estantería en la que se encuentra',
        ],
        'buttons' => [
            'new' => 'Nuevo libro',
            'edit' => 'Editar',
            'save' => 'Guardar',
            'update' => 'Actualizar',
            'cancel' => 'Cancelar',
            'delete' => 'Eliminar',
            'deleting' => 'Eliminando...',
            'saving' => 'Guardando...',
            'retry' => 'Reintentar',
        ],
        'delete' => [
            'title' => '¿Estás seguro?',
            'description' => 'Esta acción no se puede deshacer. Se eliminará permanentemente el libro del sistema.',
        ],
        'delete_dialog' => [
            'title' => '¿Estás seguro?',
            'description' => 'Esta acción no se puede deshacer. Se eliminará permanentemente el libro del sistema.',
            'success' => 'Eliminado correctamente ;)',
        ],
        'deleted_error' => 'Error al eliminar el libro',
        'no_results' => 'No hay resultados.',
        'error_loading' => 'Error al cargar los libros. Por favor, inténtalo de nuevo.',
        'showing_results' => 'Mostrando :from a :to de :total resultados',
        'pagination' => [
            'previous' => 'Anterior',
            'next' => 'Siguiente',
        ],
    ],
    'loans'=>[
        'title'=>'Préstamos',
        'create' => 'Crear Préstamo',
        'description' => 'Gestiona los préstamos del sistema',
        'edit' => 'Editar Préstamo',
        'fields' => [
            'book' => 'Libro',
            'user' => 'Usuario',
            'actions' => 'Acciones',
        ],
        'columns' => [
            'book' => 'Libro',
            'user' => 'Usuario',
            'borrowed' => [
                'title' => 'Prestado',
                'borrowed' => 'En préstamo',
                'returned' => 'Devuelto',
            ],
            'return_date' => 'Fecha de devolución',
            'is_overdue' => [
                'title' => 'Retraso',
                'overdue' => 'Con retraso',
                'on_time' => 'Sin retraso',
                'days' => 'días'
            ],
            'created_at' => 'Fecha de creación',
            'actions' => 'Acciones',
            'returned_date' => [
                'title' => 'Fecha en la que se ha devuelto',
                'not_returned' => 'No devuelto'
                ]
        ],
        'placeholders' => [
            'book' => 'Libro',
            'user' => 'Usuario',
            'borrowed' => [
                'title' => 'Prestado',
                'borrowed' => 'En préstamo',
                'returned' => 'Devuelto',
            ],
            'return_date' => 'Fecha de devolución',
            'is_overdue' => [
                'title' => 'Retraso',
                'overdue' => 'Con retraso',
                'on_time' => 'Sin retraso',
            ],
            'created_at' => 'Fecha de creación',
            'search' => 'Buscar préstamos...',
        ],
        'filters' => [
            'search' => 'Buscar',
            'book' => 'Libro',
            'user' => 'Usuario',
            'borrowed' => [
                'title' => 'Prestado',
                'borrowed' => 'En préstamo',
                'returned' => 'Devuelto',
            ],
            'return_date' => 'Fecha de devolución',
            'is_overdue' => [
                'title' => 'Retraso',
                'overdue' => 'Con retraso',
                'on_time' => 'Sin retraso',
            ],
            'created_at' => 'Fecha de creación',
        ],
        'buttons' => [
            'new' => 'Nuevo préstamo',
            'edit' => 'Editar',
            'save' => 'Guardar',
            'update' => 'Actualizar',
            'cancel' => 'Cancelar',
            'delete' => 'Eliminar',
            'deleting' => 'Eliminando...',
            'saving' => 'Guardando...',
            'retry' => 'Reintentar',
        ],
        'delete' => [
            'title' => '¿Estás seguro?',
            'description' => 'Esta acción no se puede deshacer. Se eliminará permanentemente el préstamo del sistema.',
        ],
        'delete_dialog' => [
            'title' => '¿Estás seguro?',
            'description' => 'Esta acción no se puede deshacer. Se eliminará permanentemente el préstamo del sistema.',
            'success' => 'Eliminado correctamente ;)',
        ],
        'deleted_error' => 'Error al eliminar el préstamo',
        'no_results' => 'No hay resultados.',
        'error_loading' => 'Error al cargar los préstamos. Por favor, inténtalo de nuevo.',
        'showing_results' => 'Mostrando :from a :to de :total resultados',
        'pagination' => [
            'previous' => 'Anterior',
            'next' => 'Siguiente',
        ],
    ],
    'reservations'=>[
        'title'=>'Reservas',
        'create' => 'Crear Reserva',
        'description' => 'Gestiona las reservas del sistema',
        'edit' => 'Editar Reserva',
        'fields' => [
            'book' => 'Libro',
            'user' => 'Usuario',
            'actions' => 'Acciones',
        ],
        'columns' => [
            'book' => 'Libro',
            'user' => 'Usuario',
            'active' => [
                'title' => 'Activo',
                'active' => 'Activo',
                'inactive' => 'Inactivo'
            ],
            'created_at' => 'Fecha de creación',
            'actions' => 'Acciones',
        ],
        'placeholders' => [
            'book' => 'Libro',
            'user' => 'Usuario',
            'active' => [
                'title' => 'Activo',
                'active' => 'Activo',
                'inactive' => 'Inactivo'
            ],
            'created_at' => 'Fecha de creación',
            'search' => 'Buscar reservas...',
        ],
        'filters' => [
            'search' => 'Buscar',
            'book' => 'Libro',
            'user' => 'Usuario',
            'active' => [
                'title' => 'Activo',
                'active' => 'Activo',
                'inactive' => 'Inactivo'
            ],
            'created_at' => 'Fecha de creación',
        ],
        'buttons' => [
            'new' => 'Nueva reserva',
            'edit' => 'Editar',
            'save' => 'Guardar',
            'update' => 'Actualizar',
            'cancel' => 'Cancelar',
            'delete' => 'Eliminar',
            'deleting' => 'Eliminando...',
            'saving' => 'Guardando...',
            'retry' => 'Reintentar',
        ],
        'delete' => [
            'title' => '¿Estás seguro?',
            'description' => 'Esta acción no se puede deshacer. Se eliminará permanentemente la reserva del sistema.',
        ],
        'delete_dialog' => [
            'title' => '¿Estás seguro?',
            'description' => 'Esta acción no se puede deshacer. Se eliminará permanentemente la reserva del sistema.',
            'success' => 'Eliminado correctamente ;)',
        ],
        'deleted_error' => 'Error al eliminar la reserva',
        'no_results' => 'No hay resultados.',
        'error_loading' => 'Error al cargar las reservas. Por favor, inténtalo de nuevo.',
        'showing_results' => 'Mostrando :from a :to de :total resultados',
        'pagination' => [
            'previous' => 'Anterior',
            'next' => 'Siguiente',
        ],
    ],

];
