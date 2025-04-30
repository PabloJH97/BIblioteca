import { useTranslations } from '@/hooks/use-translations';
import AppLayout from '@/layouts/app-layout';
import { UserLayout } from '@/layouts/users/UserLayout';
import { PageProps, type BreadcrumbItem, type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Archive, Barcode, SchoolIcon, StarIcon, WorkflowIcon } from 'lucide-react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

interface HistoryUserProps{
    history: any[] | undefined;
}



export function UserHistory({history}: HistoryUserProps) {
    const { t } = useTranslations();

    function UserHistoryTimeLine(){
        return(
            <div>
                <VerticalTimeline lineColor={'rgb(0,0,0)'}>
                    {history.map(history=>
                    'borrowed' in history[0] ?
                        <VerticalTimelineElement
                            className={"vertical-timeline-element--work"}
                            contentStyle={{ background: 'bg-background', color: '#000' }}
                            contentArrowStyle={{ borderRight: '7px solid  rgb(255, 150, 243)' }}
                            date={history[0].created_at}
                            iconStyle={history[0].borrowed?
                                            history[0].is_overdue?{ background: 'rgb(255, 0, 0)', color: '#fff' }
                                            :{ background: 'rgb(0, 0, 255)', color: '#fff' }
                                        :
                                            history[0].is_overdue?{ background: 'rgb(0, 255, 255)', color: '#fff' }
                                            :{ background: 'rgb(0, 255, 0)', color: '#fff' }
                                        }
                            icon={<Barcode />}
                        >
                            {history[1]?<img src={history[1]} alt="" />:''}
                            {history[0].borrowed?
                                            history[0].is_overdue?<h3 className="vertical-timeline-element-title">{t('ui.users.history.is_overdue')+history[0].book.title}</h3>
                                            :<h3 className="vertical-timeline-element-title">{t('ui.users.history.has_loan')+history[0].book.title}</h3>
                                        :
                                            history[0].is_overdue?<h3 className="vertical-timeline-element-title">{t('ui.users.history.returned_overdue')+history[0].book.title}</h3>
                                            :<h3 className="vertical-timeline-element-title">{t('ui.users.history.has_returned')+history[0].book.title}</h3>
                                        }

                        </VerticalTimelineElement>
                    :
                    <VerticalTimelineElement
                            className={"vertical-timeline-element--work"}
                            contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                            contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                            date={history[0].created_at}
                            iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                            icon={<Archive />}
                        >
                            {history[1]?<img src={history[1]} alt="" />:''}
                            <h3 className="vertical-timeline-element-title">{t('ui.users.history.has_reserved')+history[0].book.title}</h3>
                        </VerticalTimelineElement>
                    )}
                </VerticalTimeline>
            </div>
        )
    }

    return (
            <UserHistoryTimeLine></UserHistoryTimeLine>
    );
}
