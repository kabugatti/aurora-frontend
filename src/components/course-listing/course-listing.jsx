import { useState, useEffect, useCallback, useMemo } from "react";
import {
  Search,
  Filter,
  Grid,
  List,
  X,
  Star,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useDebounce } from "@/hooks/useDebounce";
import { COURSES, DURATIONS, LEVELS, SUBJECTS } from "@/utils/data";

// Number of courses to display per page
const ITEMS_PER_PAGE = 6;

export default function CourseListingPage() {
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    subjects: [],
    levels: [],
    durations: [],
    priceRange: [0, 100],
    minRating: 0,
  });
  const [sortOption, setSortOption] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Filter courses based on search query and filters - memoized to prevent unnecessary recalculations
  const filteredCourses = useMemo(() => {
    const filtered = COURSES.filter((course) => {
      if (
        debouncedSearchQuery &&
        !course.title
          .toLowerCase()
          .includes(debouncedSearchQuery.toLowerCase()) &&
        !course.description
          .toLowerCase()
          .includes(debouncedSearchQuery.toLowerCase())
      ) {
        return false;
      }

      if (
        filters.subjects.length > 0 &&
        !filters.subjects.includes(course.subject)
      ) {
        return false;
      }

      if (filters.levels.length > 0 && !filters.levels.includes(course.level)) {
        return false;
      }

      if (
        filters.durations.length > 0 &&
        !filters.durations.includes(course.duration)
      ) {
        return false;
      }

      if (
        course.price < filters.priceRange[0] ||
        course.price > filters.priceRange[1]
      ) {
        return false;
      }

      if (course.rating < filters.minRating) {
        return false;
      }

      return true;
    });

    // Sort filtered courses
    return [...filtered].sort((a, b) => {
      switch (sortOption) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "newest":
          return b.id - a.id;
        default: // featured
          return 0;
      }
    });
  }, [debouncedSearchQuery, filters, sortOption]);

  // Calculate pagination values
  const totalPages = Math.ceil(filteredCourses.length / ITEMS_PER_PAGE);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchQuery, filters, sortOption]);

  // Get current page courses - memoized to prevent unnecessary slicing
  const currentCourses = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredCourses.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredCourses, currentPage]);

  // Show loading state when filter parameters change
  useEffect(() => {
    if (debouncedSearchQuery !== searchQuery || sortOption) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [debouncedSearchQuery, sortOption]);

  // Memoized filter toggle function to prevent recreation on each render
  const toggleFilter = useCallback((type, value) => {
    setFilters((prev) => {
      const current = prev[type];
      return {
        ...prev,
        [type]: current.includes(value)
          ? current.filter((item) => item !== value)
          : [...current, value],
      };
    });
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      subjects: [],
      levels: [],
      durations: [],
      priceRange: [0, 100],
      minRating: 0,
    });
    setSearchQuery("");
  }, []);

  const hasActiveFilters = useMemo(() => {
    return (
      filters.subjects.length > 0 ||
      filters.levels.length > 0 ||
      filters.durations.length > 0 ||
      filters.priceRange[0] > 0 ||
      filters.priceRange[1] < 100 ||
      filters.minRating > 0 ||
      searchQuery !== ""
    );
  }, [filters, searchQuery]);

  // Pagination navigation
  const goToPage = useCallback((page) => {
    setCurrentPage(page);
    // Scroll to top of results when changing page
    window.scrollTo({
      top: document.getElementById("course-results").offsetTop - 100,
      behavior: "smooth",
    });
  }, []);

  // Generate array of page numbers to display
  const getPageNumbers = useCallback(() => {
    const pageNumbers = [];

    // Logic to show current page, previous and next pages
    // Always show first and last page, with ellipsis if needed
    if (totalPages <= 5) {
      // Show all pages if 5 or fewer
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always add first page
      pageNumbers.push(1);

      if (currentPage <= 3) {
        // Near the start
        pageNumbers.push(2, 3, 4);
        pageNumbers.push("...");
      } else if (currentPage >= totalPages - 2) {
        // Near the end
        pageNumbers.push("...");
        pageNumbers.push(totalPages - 3, totalPages - 2, totalPages - 1);
      } else {
        // In the middle
        pageNumbers.push("...");
        pageNumbers.push(currentPage - 1, currentPage, currentPage + 1);
        pageNumbers.push("...");
      }

      // Always add last page
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  }, [currentPage, totalPages]);

  return (
    <div className="min-h-screen bg-[#0F1624] text-white">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2">Explore Our Courses</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Find the perfect course to match your learning goals
          </p>
        </div>

        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-900 border-gray-700 text-white"
              />
            </div>

            <div className="flex gap-2">
              <Button
                className="bg-[#00B8D4] hover:bg-[#00B8D4]/90 text-white border-transparent hover:border-transparent"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="mr-2 h-4 w-4" />
                Filters
                {hasActiveFilters && (
                  <Badge className="ml-2 bg-[#00C2CB]">
                    {filters.subjects.length +
                      filters.levels.length +
                      filters.durations.length +
                      (filters.priceRange[0] > 0 || filters.priceRange[1] < 100
                        ? 1
                        : 0) +
                      (filters.minRating > 0 ? 1 : 0) +
                      (searchQuery ? 1 : 0)}
                  </Badge>
                )}
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="bg-[#00B8D4] hover:bg-[#00B8D4]/90 text-white border-transparent hover:border-transparent">
                    Sort by
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-gray-900 border-gray-700 text-white">
                  <DropdownMenuRadioGroup
                    value={sortOption}
                    onValueChange={setSortOption}
                  >
                    <DropdownMenuRadioItem value="featured">
                      Featured
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="price-low">
                      Price: Low to High
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="price-high">
                      Price: High to Low
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="rating">
                      Highest Rated
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="newest">
                      Newest
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              <div className="hidden sm:flex border border-gray-700 rounded-md">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  className={`${
                    viewMode === "grid" ? "bg-gray-800" : ""
                  } text-white hover:bg-gray-800`}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setViewMode("list")}
                  className={`${
                    viewMode === "list" ? "bg-gray-800" : ""
                  } text-white hover:bg-gray-800`}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {showFilters && (
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mb-6 animate-in fade-in duration-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Filter</h3>
                {hasActiveFilters && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="text-gray-400 hover:text-white"
                  >
                    Clear all
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="">
                  <h4 className="font-medium mb-2">Subject</h4>
                  <div className="space-y-2">
                    {SUBJECTS.map((subject) => (
                      <div key={subject} className="md:flex items-center">
                        <Checkbox
                          id={`subject-${subject}`}
                          checked={filters.subjects.includes(subject)}
                          onCheckedChange={() =>
                            toggleFilter("subjects", subject)
                          }
                          className="border-gray-600 data-[state=checked]:bg-[#00C2CB] data-[state=checked]:border-[#00C2CB]"
                        />
                        <Label
                          htmlFor={`subject-${subject}`}
                          className="ml-2 text-sm font-normal"
                        >
                          {subject}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Level</h4>
                  <div className="space-y-2">
                    {LEVELS.map((level) => (
                      <div key={level} className="md:flex items-center">
                        <Checkbox
                          id={`level-${level}`}
                          checked={filters.levels.includes(level)}
                          onCheckedChange={() => toggleFilter("levels", level)}
                          className="border-gray-600 data-[state=checked]:bg-[#00C2CB] data-[state=checked]:border-[#00C2CB]"
                        />
                        <Label
                          htmlFor={`level-${level}`}
                          className="ml-2 text-sm font-normal"
                        >
                          {level}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Duration</h4>
                  <div className="space-y-2">
                    {DURATIONS.map((duration) => (
                      <div key={duration} className="md:flex items-center">
                        <Checkbox
                          id={`duration-${duration}`}
                          checked={filters.durations.includes(duration)}
                          onCheckedChange={() =>
                            toggleFilter("durations", duration)
                          }
                          className="border-gray-600 data-[state=checked]:bg-[#00C2CB] data-[state=checked]:border-[#00C2CB]"
                        />
                        <Label
                          htmlFor={`duration-${duration}`}
                          className="ml-2 text-sm font-normal"
                        >
                          {duration}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <h4 className="font-medium">Price Range</h4>
                      <span className="text-sm text-gray-400">
                        ${filters.priceRange[0]} - ${filters.priceRange[1]}
                      </span>
                    </div>
                    <Slider
                      defaultValue={[0, 100]}
                      value={filters.priceRange}
                      min={0}
                      max={100}
                      step={5}
                      onValueChange={(value) =>
                        setFilters((prev) => ({ ...prev, priceRange: value }))
                      }
                      className="my-4 bg-gray-700 accent-teal-400 rounded-full"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <h4 className="font-medium">Minimum Rating</h4>
                      <span className="text-sm text-gray-400">
                        {filters.minRating} stars & up
                      </span>
                    </div>
                    <Slider
                      defaultValue={[0]}
                      value={[filters.minRating]}
                      min={0}
                      max={5}
                      step={0.5}
                      onValueChange={(value) =>
                        setFilters((prev) => ({ ...prev, minRating: value[0] }))
                      }
                      className="my-4"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2 mb-4">
              {searchQuery && (
                <Badge className="bg-gray-700 hover:bg-transparent border-transparent text-white border-gray-700 flex items-center gap-1">
                  Search: {searchQuery}
                  <button
                    className="h-4 w-4 flex justify-center items-center p-0 bg-transparent hover:bg-transparent border-none focus:outline-none focus:ring-0 shadow-none"
                    onClick={() => setSearchQuery("")}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </Badge>
              )}

              {filters.subjects.map((subject) => (
                <Button
                  key={subject}
                  onClick={() => toggleFilter("subjects", subject)}
                  className="bg-gray-800 hover:bg-gray-800 text-white border-transparent flex items-center rounded-full outline-none"
                >
                  {subject}
                  <X className="h-3 w-3" />
                </Button>
              ))}

              {filters.levels.map((level) => (
                <Badge
                  key={level}
                  variant="outline"
                  className="bg-gray-800 text-white border-gray-700 flex items-center gap-1"
                >
                  {level}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 hover:bg-transparent"
                    onClick={() => toggleFilter("levels", level)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}

              {filters.durations.map((duration) => (
                <Badge
                  key={duration}
                  variant="outline"
                  className="bg-gray-800 text-white border-gray-700 flex items-center gap-1"
                >
                  {duration}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 hover:bg-transparent"
                    onClick={() => toggleFilter("durations", duration)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}

              {(filters.priceRange[0] > 0 || filters.priceRange[1] < 100) && (
                <Badge
                  variant="outline"
                  className="bg-gray-800 text-white border-gray-700 flex items-center gap-1"
                >
                  ${filters.priceRange[0]} - ${filters.priceRange[1]}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 hover:bg-transparent"
                    onClick={() =>
                      setFilters((prev) => ({ ...prev, priceRange: [0, 100] }))
                    }
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}

              {filters.minRating > 0 && (
                <Badge
                  variant="outline"
                  className="bg-gray-800 text-white border-gray-700 flex items-center gap-1"
                >
                  {filters.minRating}+ Stars
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 hover:bg-transparent"
                    onClick={() =>
                      setFilters((prev) => ({ ...prev, minRating: 0 }))
                    }
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
            </div>
          )}
        </div>

        <div id="course-results">
          {isLoading ? (
            <div
              className={`grid ${
                viewMode === "grid"
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1"
              } gap-6`}
            >
              {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
                <div
                  key={index}
                  className="bg-gray-900 rounded-lg overflow-hidden"
                >
                  <Skeleton className="h-48 w-full bg-gray-800" />
                  <div className="p-4 space-y-3">
                    <Skeleton className="h-6 w-3/4 bg-gray-800" />
                    <Skeleton className="h-4 w-full bg-gray-800" />
                    <div className="flex justify-between">
                      <Skeleton className="h-4 w-1/4 bg-gray-800" />
                      <Skeleton className="h-4 w-1/4 bg-gray-800" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredCourses.length === 0 ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-800 mb-4">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No courses found</h3>
              <p className="text-gray-400 max-w-md mx-auto mb-6">
                We couldn&#39;t find any courses matching your criteria. Try
                adjusting your filters or search query.
              </p>
              <Button
                onClick={clearFilters}
                className="bg-[#00C2CB] hover:bg-[#00A8B0]"
              >
                Clear all filters
              </Button>
            </div>
          ) : (
            <>
              {/* Course results status */}
              <div className="text-gray-400 text-sm mb-4">
                Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} -{" "}
                {Math.min(currentPage * ITEMS_PER_PAGE, filteredCourses.length)}{" "}
                of {filteredCourses.length} courses
              </div>

              <div
                className={`grid ${
                  viewMode === "grid"
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                    : "grid-cols-1"
                } gap-6`}
              >
                {currentCourses.map((course) => (
                  <Card
                    key={course.id}
                    className={`bg-gray-900 border-gray-800 overflow-hidden transition-all hover:border-gray-700 ${
                      viewMode === "list" ? "block md:flex flex-row" : ""
                    }`}
                  >
                    <div
                      className={`${
                        viewMode === "list"
                          ? "hidden sm:block w-1/3 min-w-[200px]"
                          : ""
                      }`}
                    >
                      <div
                        className={`relative bg-gray-800 ${
                          viewMode === "list" ? "h-full w-full" : "aspect-video"
                        }`}
                      >
                        <img
                          src={course.thumbnail || "/api/placeholder/400/320"}
                          alt={course.title}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </div>

                    <div
                      className={`flex flex-col ${
                        viewMode === "list" ? "md:w-2/3" : ""
                      }`}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-2">
                            <Badge className="bg-gray-700 text-[#00C2CB] border-transparent hover:bg-gray-700">
                              {course.subject}
                            </Badge>
                          </div>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 fill-[#00C2CB] text-[#00C2CB]" />
                            <span className="ml-1 text-sm text-white">
                              {course.rating}
                            </span>
                          </div>
                        </div>
                        <h3 className="text-lg font-semibold mt-2 text-white">
                          {course.title}
                        </h3>
                      </CardHeader>

                      <CardContent className="pb-2">
                        <p className="text-gray-400 text-sm">
                          {course.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-3 ">
                          <Badge className="bg-gray-700 text-gray-300 border-transparent hover:bg-gray-700">
                            {course.level}
                          </Badge>
                          <Badge className="bg-gray-700 text-gray-300 border-transparent hover:bg-gray-700">
                            {course.duration}
                          </Badge>
                        </div>
                      </CardContent>

                      <CardFooter className="block sm:flex justify-between items-center pt-2 mt-auto">
                        <div>
                          <p className="text-[#00C2CB] font-bold">
                            ${course.price}
                          </p>
                          <p className="text-xs text-gray-400">
                            By {course.instructor}
                          </p>
                        </div>
                        <Button className="bg-[#00C2CB] hover:bg-[#00A8B0] mt-2 sm:mt-0 flex justify-center sm:block">
                          Start Learning
                        </Button>
                      </CardFooter>
                    </div>
                  </Card>
                ))}
              </div>
            </>
          )}

          {filteredCourses.length > 0 && !isLoading && (
            <div className="flex justify-center mt-8">
              <div className="flex flex-wrap justify-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  disabled={currentPage === 1}
                  onClick={() => goToPage(currentPage - 1)}
                  className="border-gray-700 text-white bg-gray-700 hover:bg-gray-800"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                {getPageNumbers().map((pageNum, index) =>
                  pageNum === "..." ? (
                    <span
                      key={`ellipsis-${index}`}
                      className="flex items-center px-2 text-gray-400"
                    >
                      ...
                    </span>
                  ) : (
                    <Button
                      key={`page-${pageNum}`}
                      variant="outline"
                      size="sm"
                      className={`${
                        currentPage === pageNum
                          ? "bg-gray-800 text-white"
                          : "bg-transparent text-white hover:bg-gray-800"
                      } border-gray-700`}
                      onClick={() => goToPage(pageNum)}
                    >
                      {pageNum}
                    </Button>
                  )
                )}

                <Button
                  variant="outline"
                  size="icon"
                  disabled={currentPage === totalPages || totalPages === 0}
                  onClick={() => goToPage(currentPage + 1)}
                  className="border-gray-700 text-white bg-gray-700 hover:bg-gray-800"
                  aria-label="Next page"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
