import { Search } from 'lucide-react'
import { categories } from '@/data/products'
import type { ProductFilters as Filters } from '@/types'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'

interface ProductFiltersProps {
  filters: Filters
  onChange: (filters: Filters) => void
}

export function ProductFiltersBar({ filters, onChange }: ProductFiltersProps) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-end">
      <div className="flex-1">
        <Input
          label="Buscar"
          placeholder="Nome, descrição..."
          value={filters.search ?? ''}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
          leftIcon={<Search className="h-4 w-4" />}
        />
      </div>

      <div className="sm:w-44">
        <Select
          label="Categoria"
          value={filters.category ?? 'all'}
          onChange={(e) =>
            onChange({
              ...filters,
              category: e.target.value as Filters['category'],
            })
          }
          options={categories.map((c) => ({ value: c.id, label: c.label }))}
        />
      </div>

      <div className="sm:w-44">
        <Select
          label="Ordenar por"
          value={filters.sortBy ?? ''}
          onChange={(e) =>
            onChange({
              ...filters,
              sortBy: (e.target.value || undefined) as Filters['sortBy'],
            })
          }
          options={[
            { value: '', label: 'Relevância' },
            { value: 'name', label: 'Nome' },
            { value: 'price-asc', label: 'Menor preço' },
            { value: 'price-desc', label: 'Maior preço' },
            { value: 'rating', label: 'Melhor avaliação' },
          ]}
        />
      </div>
    </div>
  )
}
