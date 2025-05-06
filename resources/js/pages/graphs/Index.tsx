import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableSkeleton } from "@/components/stack-table/TableSkeleton";
import { UserLayout } from "@/layouts/users/UserLayout";
import { User, useDeleteUser, useUsers } from "@/hooks/users/useUsers";
import { Check, PencilIcon, PlusIcon, TrashIcon } from "lucide-react";
import { useDebounce } from "@/hooks/use-debounce";
import { useState, useMemo } from "react";
import { Link, usePage } from "@inertiajs/react";
import { useTranslations } from "@/hooks/use-translations";
import { Table } from "@/components/stack-table/Table";
import { createTextColumn, createDateColumn, createActionsColumn } from "@/components/stack-table/columnsTable";
import { DeleteDialog } from "@/components/stack-table/DeleteDialog";
import { FiltersTable, FilterConfig } from "@/components/stack-table/FiltersTable";
import { toast } from "sonner";
import { router } from '@inertiajs/react';
import { ColumnDef, Row } from "@tanstack/react-table";
import { LoanLayout } from "@/layouts/loans/LoanLayout";
import { LineChart, Line } from 'recharts';
import { Loan, useDeleteLoan, useLoans } from "@/hooks/loans/useLoans";
import { isEmpty } from "lodash";
import SimpleRadarChart from "./components/SimpleRadarChart";
import { PageProps } from "@/types";
import { GraphLayout } from "@/layouts/graphs/GraphLayout";
import SimpleBarChart from "./components/SimpleBarChart";
import { Option, Select } from "react-day-picker";

interface GraphProps extends PageProps{
    data:{
        userData: any[];
        bookData: any[];
        zoneData: any[];
    };

}

export default function GraphsIndex({data}:GraphProps) {
  const { t } = useTranslations();
  const { url } = usePage();


  // Obtener los parámetros de la URL actual
  const urlParams = new URLSearchParams(url.split('?')[1] || '');
  const pageParam = urlParams.get('page');
  const perPageParam = urlParams.get('per_page');

  const [graphState, setGraphState]=useState('user');

  function ZoneRadarChart(){
    return(
        <SimpleRadarChart data={data.zoneData}></SimpleRadarChart>
    )
  }

  function BookBarChart(){
    return(
        <SimpleBarChart data={data.bookData}></SimpleBarChart>
    )
  }

  function UserBarChart(){
    return(
        <SimpleBarChart data={data.userData}></SimpleBarChart>
    )
  }

  function Graph(){
    return(
    <>
    <div>
        <Select
            value={graphState}
            onChange={(e)=>setGraphState(e.target.value)}
        >
            <Option value={'user'}>{t('ui.graphs.options.user')}</Option>
            <Option value={'book'}>{t('ui.graphs.options.book')}</Option>
            <Option value={'zone'}>{t('ui.graphs.options.zone')}</Option>
        </Select>
    </div>
    {graphState==='user'&&<UserBarChart></UserBarChart>}
    {graphState==='book'&&<BookBarChart></BookBarChart>}
    {graphState==='zone'&&<ZoneRadarChart></ZoneRadarChart>}
    </>
    )
  }

  return (
      <GraphLayout title={t('ui.loans.title')}>
        <Graph></Graph>
      </GraphLayout>
  );
}
