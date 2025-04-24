import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTranslations } from '@/hooks/use-translations';
import { router } from '@inertiajs/react';
import type { AnyFieldApi } from '@tanstack/react-form';
import { useForm } from '@tanstack/react-form';
import { useQueryClient } from '@tanstack/react-query';
import { FileText, Lock, Mail, PackageOpen, Save, Settings, Shield, Circle, X, Eye, EyeOff, Book } from 'lucide-react';
import { useState } from 'react';
import { Option, Select } from 'react-day-picker';
import { toast } from 'sonner';

interface BookFormProps {
    initialData?: {
        id: string;
        title: string;
        author: string;
        pages: number;
        editorial: string;
        ISBN: string;
        genre: string;
        bookshelf_id: string;

    };
    page?: string;
    perPage?: string;
    pageTitle?: string;
    arrayGenres: any[];
    arrayBookshelves: any[];
    arrayFloors: any[];
    image: File;
    media: string;

}
let genreArray:string[]=[]

// Field error display component
function FieldInfo({ field }: { field: AnyFieldApi }) {
    return (
        <>
            {field.state.meta.isTouched && field.state.meta.errors.length ? (
                <p className="text-destructive mt-1 text-sm">{field.state.meta.errors.join(', ')}</p>
            ) : null}
            {field.state.meta.isValidating ? <p className="text-muted-foreground mt-1 text-sm">Validating...</p> : null}
        </>
    );
}

export function BookForm({ initialData, page, perPage, pageTitle, arrayGenres, arrayBookshelves, image, media, arrayFloors }: BookFormProps) {
    const { t } = useTranslations();
    const queryClient = useQueryClient();
    const initialDataGenres=initialData?.genre.split(', ')??['']
    const [genreArrayState, setGenreArrayState]=useState(initialDataGenres)
    const [floorState, setFloorState]=useState('');
    const [zoneState, setZoneState]=useState('');
    const [disabledZoneState, setDisabledZoneState]=useState(floorState=='');
    const [disabledBookshelfState, setDisabledBookshelfState]=useState(zoneState=='')
    const [imageState, setImageState]=useState(image??'')
    function manageGenreArray(value:string){
        if (!genreArray.includes(value)) {
            genreArray = [...genreArray, value];
            setGenreArrayState(genreArray);
        } else {
            genreArray = genreArray.filter((a) => a !== value);
            setGenreArrayState(genreArray);
        }
    }
    function selectFloor(value:string){
        if(value!=''){
            setFloorState(value)
            setDisabledZoneState(false);
        }else{
            setFloorState(value)
            setDisabledZoneState(true);
        }
    }
    function selectZone(value:string){
        if(value!=''){
            setZoneState(value)
            setDisabledBookshelfState(false);
        }else{
            setZoneState(value)
            setDisabledBookshelfState(true);
        }
    }
    function selectImage(value:File){
        setImageState(value);
    }

    // TanStack Form setup
    const form = useForm({
        defaultValues: {
            title: initialData?.title ?? '',
            author: initialData?.author ?? '',
            pages: initialData?.pages ?? 0,
            editorial: initialData?.editorial ?? '',
            ISBN: initialData?.ISBN ?? '',
            genre: [''],
            bookshelf_id: initialData?.bookshelf_id ?? '',
            image: image,
        },
        onSubmit: async ({ value }) => {
            const formData=new FormData();
            formData.append('title', value.title);
            formData.append('author', value.author);
            formData.append('pages', value.pages);
            formData.append('editorial', value.editorial);
            formData.append('ISBN', value.ISBN);
            formData.append('bookshelf_id', value.bookshelf_id);
            formData.append('image', imageState);
            formData.append('_method', 'PUT');
            let genreString = '';
            if (genreArrayState.length > 0) {
                genreString=genreArrayState[0];
                if (genreArrayState.length>1) {
                    for (let i=1; i < genreArrayState.length; i++) {
                        genreString +=  ', ' + genreArrayState[i];
                    };
                }
            } else {
                genreString = genreArrayState[0];
            }
            formData.append('genre', genreString);
            const options = {
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: ['books'] });

                    // Construct URL with page parameters
                    let url = '/books';
                    if (page) {
                        url += `?page=${page}`;
                        if (perPage) {
                            url += `&per_page=${perPage}`;
                        }
                    }

                    router.visit(url);
                },
                onError: (errors: Record<string, string>) => {
                    if (Object.keys(errors).length === 0) {
                        toast.error(initialData ? t('messages.books.error.update') : t('messages.books.error.create'));
                    }
                },
            };

            // Submit with Inertia
            if (initialData) {
                router.post(`/books/${initialData.id}`, formData, options);
            } else {
                router.post('/books', value, options);
            }
        },
    });

    // Form submission handler
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();
        form.setFieldValue('genre', genreArrayState);
        form.handleSubmit();
    };

    function BookFormData() {
        const listGenres=arrayGenres.map(genre=>
            <Option value={genre.name}>{t(`ui.genres.names.${genre.name}`)}</Option>
        )
        const listGenreArray=genreArrayState.map(genre=>
            arrayGenres.filter(genreToFind=>
                genreToFind.name==genre
            ).map(genre=>
                <div className='flex flex-row items-center '>
                    <p>{t(`ui.genres.names.${genre.name}`)}</p>
                    <Button type='button' value={genre.name} onClick={(e)=>{manageGenreArray(e.currentTarget.value)}} className='bg-foreground h-2 w-2'><X></X></Button>

                </div>
            )
        )
        const listFloors=arrayFloors.map(floor=>
            <Option value={floor.id}>{floor.name}</Option>
        )
        const listZones=arrayFloors.filter(floor=>
            floor.id===floorState).map(floor=>
                floor.zones.filter(zone=>
                    genreArrayState.includes(zone.genre.name)
                ).map(zone=>
                    <Option value={zone.id}>{t(`ui.genres.names.${zone.genre.name}`)}</Option>
                )
            )
        const listBookshelves=arrayFloors.filter(floor=>
            floor.id===floorState).map(floor=>
                floor.zones.filter(zone=>
                    zone.id===zoneState
                    ).map(zone=>
                        zone.bookshelves.map(bookshelf=>
                            <Option value={bookshelf.id}>{t('ui.bookshelves.title') +' '+ bookshelf.number}</Option>
                        )
                    )
                )







        return (
            <CardContent className={'h-full bg-background'}>
                <div>
                    <form.Field
                        name="title"
                        validators={{
                            onChangeAsync: async ({ value }) => {
                                await new Promise((resolve) => setTimeout(resolve, 500));
                                return !value
                                    ? t('ui.validation.required', { attribute: t('ui.users.fields.name').toLowerCase() })
                                    : value.length < 2
                                      ? t('ui.validation.min.string', { attribute: t('ui.users.fields.name').toLowerCase(), min: '2' })
                                      : undefined;
                            },
                        }}
                    >
                        {(field) => (
                            <>
                                <div className="flex flex-row items-center">

                                    <Label htmlFor={field.name}>{t('ui.books.fields.title')}</Label>
                                </div>

                                <Input
                                    id={field.name}
                                    type='string'
                                    name={field.name}
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    onBlur={field.handleBlur}
                                    placeholder={t('ui.books.placeholders.title')}
                                    disabled={form.state.isSubmitting}
                                    required={false}
                                    autoComplete="off"
                                />
                                <FieldInfo field={field} />
                            </>
                        )}
                    </form.Field>
                </div>
                <br />
                <div>
                    <form.Field
                        name="author"
                        validators={{
                            onChangeAsync: async ({ value }) => {
                                await new Promise((resolve) => setTimeout(resolve, 500));
                                return !value
                                    ? t('ui.validation.required', { attribute: t('ui.users.fields.name').toLowerCase() })
                                    : value.length < 2
                                      ? t('ui.validation.min.string', { attribute: t('ui.users.fields.name').toLowerCase(), min: '2' })
                                      : undefined;
                            },
                        }}
                    >
                        {(field) => (
                            <>
                                <div className="flex flex-row items-center">

                                    <Label htmlFor={field.name}>{t('ui.books.fields.author')}</Label>
                                </div>

                                <Input
                                    id={field.name}
                                    type='string'
                                    name={field.name}
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    onBlur={field.handleBlur}
                                    placeholder={t('ui.books.placeholders.author')}
                                    disabled={form.state.isSubmitting}
                                    required={false}
                                    autoComplete="off"
                                />
                                <FieldInfo field={field} />
                            </>
                        )}
                    </form.Field>
                </div>
                <br />
                <div>
                    <form.Field
                        name="pages"
                        validators={{
                            onChangeAsync: async ({ value }) => {
                                await new Promise((resolve) => setTimeout(resolve, 500));
                                return !value
                                    ? t('ui.validation.required', { attribute: t('ui.users.fields.name').toLowerCase() })
                                    : value< 2
                                      ? t('ui.validation.min.string', { attribute: t('ui.users.fields.name').toLowerCase(), min: '2' })
                                      : undefined;
                            },
                        }}
                    >
                        {(field) => (
                            <>
                                <div className="flex flex-row items-center">

                                    <Label htmlFor={field.name}>{t('ui.books.fields.pages')}</Label>
                                </div>

                                <Input
                                    id={field.name}
                                    type='number'
                                    name={field.name}
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(parseInt(e.target.value))}
                                    onBlur={field.handleBlur}
                                    placeholder={t('ui.books.placeholders.pages')}
                                    disabled={form.state.isSubmitting}
                                    required={false}
                                    autoComplete="off"
                                />
                                <FieldInfo field={field} />
                            </>
                        )}
                    </form.Field>
                </div>
                <br />
                <div>
                    <form.Field
                        name="editorial"
                        validators={{
                            onChangeAsync: async ({ value }) => {
                                await new Promise((resolve) => setTimeout(resolve, 500));
                                return !value
                                    ? t('ui.validation.required', { attribute: t('ui.users.fields.name').toLowerCase() })
                                    : value.length < 2
                                      ? t('ui.validation.min.string', { attribute: t('ui.users.fields.name').toLowerCase(), min: '2' })
                                      : undefined;
                            },
                        }}
                    >
                        {(field) => (
                            <>
                                <div className="flex flex-row items-center">

                                    <Label htmlFor={field.name}>{t('ui.books.fields.editorial')}</Label>
                                </div>

                                <Input
                                    id={field.name}
                                    type='string'
                                    name={field.name}
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    onBlur={field.handleBlur}
                                    placeholder={t('ui.books.placeholders.editorial')}
                                    disabled={form.state.isSubmitting}
                                    required={false}
                                    autoComplete="off"
                                />
                                <FieldInfo field={field} />
                            </>
                        )}
                    </form.Field>
                </div>
                <br />
                <div>
                    <form.Field
                        name="ISBN"
                        validators={{
                            onChangeAsync: async ({ value }) => {
                                await new Promise((resolve) => setTimeout(resolve, 500));
                                return !value
                                    ? t('ui.validation.required', { attribute: t('ui.users.fields.name').toLowerCase() })
                                    : value.length < 2
                                      ? t('ui.validation.min.string', { attribute: t('ui.users.fields.name').toLowerCase(), min: '2' })
                                      : undefined;
                            },
                        }}
                    >
                        {(field) => (
                            <>
                                <div className="flex flex-row items-center">

                                    <Label htmlFor={field.name}>{t('ui.books.fields.ISBN')}</Label>
                                </div>

                                <Input
                                    id={field.name}
                                    type='string'
                                    name={field.name}
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    onBlur={field.handleBlur}
                                    placeholder={t('ui.books.placeholders.ISBN')}
                                    disabled={form.state.isSubmitting}
                                    required={false}
                                    autoComplete="off"
                                />
                                <FieldInfo field={field} />
                            </>
                        )}
                    </form.Field>
                </div>
                <br />
                <div>
                    {t('ui.books.fields.genre')}
                    <div className='flex flex-wrap'>
                        {listGenreArray}
                    </div>
                    <br />
                    <form.Field
                        name="genre"

                    >
                        {(field) => (
                            <>
                                <Select multiple={true} size={5} onChange={(e)=>{manageGenreArray(e.target.value)}} className='w-full rounded-md border-2'>
                                    {listGenres}
                                </Select>
                            </>
                        )}
                    </form.Field>
                </div>
                <div>
                    {t('ui.books.fields.bookshelf')}
                    <Select value={floorState} onChange={(e)=> {selectFloor(e.target.value)}} className='h-10 w-full rounded-md border-2'>
                        <Option value={''}>{'Seleccione un piso'}</Option>
                        {listFloors}
                    </Select>
                </div>
                <div>
                    <Select disabled={disabledZoneState} value={zoneState} onChange={(e)=> {selectZone(e.target.value)}} className='h-10 w-full rounded-md border-2'>
                        <Option value={''}>{'Seleccione una zona'}</Option>
                        {listZones}
                    </Select>
                </div>
                <div>
                    <form.Field
                        name="bookshelf_id"

                    >
                        {(field) => (
                            <>
                                <Select disabled={disabledBookshelfState} onChange={(e)=> {field.handleChange(e.target.value)}} className='h-10 w-full rounded-md border-2'>
                                    <Option value={''}>{'Seleccione una estantería'}</Option>
                                    {listBookshelves}
                                </Select>
                            </>
                        )}
                    </form.Field>
                </div>
                <br />
                <div>
                    <form.Field
                        name="image"

                    >
                        {(field) => (
                            <>
                                <div className="flex flex-row items-center">

                                    <Label htmlFor={field.name}>{t('ui.books.fields.image')}</Label>
                                </div>

                                <Input
                                    id={field.name}
                                    type='file'
                                    name={field.name}
                                    onChange={(e) => {field.handleChange(e.target.files[0]), selectImage(e.target.files[0])}}
                                    onBlur={field.handleBlur}
                                    placeholder={t('ui.books.placeholders.image')}
                                    disabled={form.state.isSubmitting}
                                    required={false}
                                    autoComplete="off"
                                    accept='image/*'
                                />
                                {imageState &&(
                                    <img src={URL.createObjectURL(imageState)}></img>
                                )}
                                {initialData && imageState=='' &&(
                                    <img src={media} alt="" />
                                )}
                                <FieldInfo field={field} />

                            </>
                        )}
                    </form.Field>
                </div>
            </CardContent>
        );
    }



    function BookFormView() {
        return (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {/* Name field */}
                <Card className="bg-background">
                    <CardHeader>
                        <div className="flex flex-row">
                            <Book color="#155dfc"></Book>
                            <h1 className="font-bold">{pageTitle}</h1>
                        </div>
                        <div>
                            <p className="font-sans text-sm font-bold text-gray-400">
                                {'Ingresa la información para crear un nuevo libro en el sistema'}
                            </p>
                        </div>
                    </CardHeader>

                    <div><BookFormData></BookFormData></div>

                    {/* Form buttons */}
                    <CardFooter className="justify-center">
                        <div className="flex w-full flex-row justify-between gap-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    let url = '/books';
                                    if (page) {
                                        url += `?page=${page}`;
                                        if (perPage) {
                                            url += `&per_page=${perPage}`;
                                        }
                                    }
                                    router.visit(url);
                                }}
                                disabled={form.state.isSubmitting}
                            >
                                <X></X>
                                {t('ui.books.buttons.cancel')}
                            </Button>

                            <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
                                {([canSubmit, isSubmitting]) => (
                                    <Button type="submit" disabled={!canSubmit} className="bg-blue-400">
                                        <Save></Save>
                                        {isSubmitting
                                            ? t('ui.books.buttons.saving')
                                            : initialData
                                              ? t('ui.books.buttons.update')
                                              : t('ui.books.buttons.save')}
                                    </Button>
                                )}
                            </form.Subscribe>
                        </div>
                    </CardFooter>
                </Card>
            </form>
        );
    }

    return <BookFormView></BookFormView>;
}
