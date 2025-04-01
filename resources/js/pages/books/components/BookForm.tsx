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
import { FileText, Lock, Mail, PackageOpen, Save, Settings, Shield, Circle, X, Eye, EyeOff } from 'lucide-react';
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
        genre: string[];
        bookshelf_id: string;
    };
    page?: string;
    perPage?: string;
    pageTitle?: string;
    arrayGenres: any[];
    arrayBookshelves: any[];

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

export function BookForm({ initialData, page, perPage, pageTitle, arrayGenres, arrayBookshelves }: BookFormProps) {
    const { t } = useTranslations();
    const queryClient = useQueryClient();
    const [genreArrayState, setGenreArrayState]=useState(genreArray)

    function manageGenreArray(value:string){
        if (!genreArray.includes(value)) {
            genreArray = [...genreArray, value];
            setGenreArrayState(genreArray);
        } else {
            genreArray = genreArray.filter((a) => a !== value);
            setGenreArrayState(genreArray);
        }
    }


    // TanStack Form setup
    const form = useForm({
        defaultValues: {
            title: initialData?.title,
            author: initialData?.author,
            pages: initialData?.pages,
            genre: initialData?.genre,
            bookshelf_id: initialData?.bookshelf_id,
        },
        onSubmit: async ({ value }) => {
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
                router.put(`/books/${initialData.id}`, value, options);
            } else {
                router.post('/books', value, options);
            }
        },
    });

    // Form submission handler
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
    };

    function BookFormData() {
        const listGenres=arrayGenres.map(genre=>
            <Option value={genre.id}>{genre.name}</Option>
        )
        const listBookshelves=arrayBookshelves.map(bookshelf=>
            <Option value={bookshelf.id}>{bookshelf.number}</Option>
        )
        const listGenreArray=genreArrayState.map(genre=>
            arrayGenres.filter(genreToFind=>
                genreToFind.id==genre
            ).map(genre=>
                <Button type='button' value={genre.id} onClick={(e)=>{manageGenreArray(e.currentTarget.value)}}>{genre.name}</Button>
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
                                    <Circle className="w-5"></Circle>
                                    <Label htmlFor={field.name}>{t('ui.books.fields.number')}</Label>
                                </div>

                                <Input
                                    id={field.name}
                                    type='string'
                                    name={field.name}
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    onBlur={field.handleBlur}
                                    placeholder={t('ui.books.placeholders.number')}
                                    disabled={form.state.isSubmitting}
                                    required={false}
                                    autoComplete="off"
                                />
                                <FieldInfo field={field} />
                            </>
                        )}
                    </form.Field>
                </div>
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
                                    <Circle className="w-5"></Circle>
                                    <Label htmlFor={field.name}>{t('ui.books.fields.number')}</Label>
                                </div>

                                <Input
                                    id={field.name}
                                    type='string'
                                    name={field.name}
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    onBlur={field.handleBlur}
                                    placeholder={t('ui.books.placeholders.number')}
                                    disabled={form.state.isSubmitting}
                                    required={false}
                                    autoComplete="off"
                                />
                                <FieldInfo field={field} />
                            </>
                        )}
                    </form.Field>
                </div>
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
                                    <Circle className="w-5"></Circle>
                                    <Label htmlFor={field.name}>{t('ui.books.fields.number')}</Label>
                                </div>

                                <Input
                                    id={field.name}
                                    type='number'
                                    name={field.name}
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(parseInt(e.target.value))}
                                    onBlur={field.handleBlur}
                                    placeholder={t('ui.books.placeholders.number')}
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
                    <div>
                        {listGenreArray}
                    </div>
                    <br />
                    <form.Field
                        name="genre"

                    >
                        {(field) => (
                            <>
                                <Select multiple={true} onChange={(e)=>{manageGenreArray(e.target.value)}}>
                                    {listGenres}
                                </Select>
                            </>
                        )}
                    </form.Field>
                </div>
                <div>
                    <form.Field
                        name="bookshelf_id"

                    >
                        {(field) => (
                            <>
                                <Select>
                                    <Option>{'a'}</Option>
                                    {listBookshelves}
                                </Select>
                            </>
                        )}
                    </form.Field>
                </div>
                <br />
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
                            <Circle color="#155dfc"></Circle>
                            <h1 className="font-bold">{pageTitle}</h1>
                        </div>
                        <div>
                            <p className="font-sans text-sm font-bold text-gray-400">
                                {'Ingresa la información para crear una nueva estantería en el sistema'}
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
