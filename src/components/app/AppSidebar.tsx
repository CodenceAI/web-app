import { useState } from "react";
import { ChevronRight, ChevronDown, File, Folder, Github, Star, GitFork, Calendar, Code, Info } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RepoData, FileNode } from "@/types/app";

interface AppSidebarProps {
  repoData: RepoData;
}

const FileTree = ({ node, level = 0 }: { node: FileNode; level?: number }) => {
  const [isOpen, setIsOpen] = useState(level < 2); // Auto-expand first 2 levels
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div>
      <SidebarMenuItem>
        <SidebarMenuButton
          onClick={() => hasChildren && setIsOpen(!isOpen)}
          className={`justify-start gap-2 ${level > 0 ? 'ml-4' : ''}`}
        >
          {hasChildren ? (
            isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />
          ) : (
            <div className="w-4" />
          )}
          
          {node.type === 'directory' ? (
            <Folder className="w-4 h-4 text-primary" />
          ) : (
            <File className="w-4 h-4 text-muted-foreground" />
          )}
          
          <span className="truncate">{node.name}</span>
          
          {node.size && (
            <Badge variant="secondary" className="ml-auto text-xs">
              {(node.size / 1024).toFixed(1)}KB
            </Badge>
          )}
        </SidebarMenuButton>
      </SidebarMenuItem>
      
      {hasChildren && isOpen && (
        <div>
          {node.children?.map((child, index) => (
            <FileTree key={`${child.path}-${index}`} node={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

const AppSidebar = ({ repoData }: AppSidebarProps) => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar className={isCollapsed ? "w-14" : "w-80"} collapsible="icon">
      <SidebarTrigger className="m-2 self-end" />
      
      <SidebarContent className="space-y-4">
        {/* Repository Info */}
        {!isCollapsed && (
          <div className="p-4 space-y-4">
            <Card className="gradient-card border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Github className="w-5 h-5 text-primary" />
                  <span className="truncate">{repoData.name}</span>
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-3">
                {repoData.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {repoData.description}
                  </p>
                )}
                
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="text-xs">
                    <Code className="w-3 h-3 mr-1" />
                    {repoData.language}
                  </Badge>
                  
                  {repoData.stars && (
                    <Badge variant="outline" className="text-xs">
                      <Star className="w-3 h-3 mr-1" />
                      {repoData.stars.toLocaleString()}
                    </Badge>
                  )}
                  
                  {repoData.forks && (
                    <Badge variant="outline" className="text-xs">
                      <GitFork className="w-3 h-3 mr-1" />
                      {repoData.forks.toLocaleString()}
                    </Badge>
                  )}
                </div>
                
                <div className="space-y-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <File className="w-3 h-3" />
                    <span>{repoData.totalFiles} files</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3 h-3" />
                    <span>Updated {repoData.lastUpdated}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* File Tree */}
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-2">
            <Folder className="w-4 h-4" />
            {!isCollapsed && "Project Files"}
          </SidebarGroupLabel>
          
          <SidebarGroupContent>
            <SidebarMenu>
              {repoData.files.map((file, index) => (
                <FileTree key={`${file.path}-${index}`} node={file} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Quick Stats */}
        {!isCollapsed && (
          <div className="p-4">
            <Card className="bg-card/50 border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Info className="w-4 h-4 text-primary" />
                  Analysis Status
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Indexed</span>
                  <span className="text-primary font-medium">100%</span>
                </div>
                
                <div className="w-full bg-secondary rounded-full h-1.5">
                  <div className="bg-primary h-1.5 rounded-full w-full" />
                </div>
                
                <div className="text-xs text-muted-foreground">
                  Ready for semantic search
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;