import { describe, it, expect, beforeEach } from 'vitest';
import useStore from './store';

describe('Node Type Normalization', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    // Reset store state
    useStore.setState({ nodes: [], edges: [] });
  });

  it('should normalize AI-generated JSON with mixed node types', () => {
    const aiGeneratedData = JSON.stringify({
      _metadata: {
        version: "1.0.0",
        format: "mindmap-json",
        author: "AI Assistant",
        exportedAt: new Date().toISOString(),
        description: "AI-generated mindmap"
      },
      nodes: [
        { id: '1', type: 'default', data: { label: 'Node 1' }, position: { x: 0, y: 0 } },
        { id: '2', type: 'output', data: { label: 'Node 2' }, position: { x: 100, y: 100 } },
        { id: '3', type: 'custom', data: { label: 'Node 3' }, position: { x: 200, y: 200 } },
        { id: '4', type: 'input', data: { label: 'Node 4' }, position: { x: 300, y: 300 } }
      ],
      edges: []
    });

    const result = useStore.getState().importData(aiGeneratedData);
    
    expect(result.success).toBe(true);
    expect(result.type).toBe('success');
    
    const nodes = useStore.getState().nodes;
    expect(nodes).toHaveLength(4);
    
    // All nodes should have type "input"
    nodes.forEach(node => {
      expect(node.type).toBe('input');
    });
    
    // Other properties should be preserved
    expect(nodes[0].data.label).toBe('Node 1');
    expect(nodes[1].data.label).toBe('Node 2');
    expect(nodes[2].data.label).toBe('Node 3');
    expect(nodes[3].data.label).toBe('Node 4');
  });

  it('should handle previously exported mindmap files (backward compatibility)', () => {
    const legacyExportData = JSON.stringify({
      _metadata: {
        version: "1.0.0",
        format: "mindmap-json",
        author: "Nishant Gaharwar",
        github: "https://github.com/iamnishantgaharwar",
        website: "https://www.nishantgaharwar.com",
        exportedAt: "2024-01-15T10:30:00.000Z",
        description: "Mindmap data file - Do not modify this metadata"
      },
      nodes: [
        { 
          id: 'node-1', 
          type: 'input', 
          data: { label: 'Main Idea' }, 
          position: { x: 250, y: 150 },
          style: { width: 150, height: 80 }
        },
        { 
          id: 'node-2', 
          type: 'input', 
          data: { label: 'Sub Idea' }, 
          position: { x: 450, y: 250 },
          style: { width: 150, height: 80 }
        }
      ],
      edges: [
        { 
          id: 'edge-1', 
          source: 'node-1', 
          target: 'node-2',
          style: { stroke: '#ef4444' },
          data: { color: '#ef4444' }
        }
      ]
    });

    const result = useStore.getState().importData(legacyExportData);
    
    expect(result.success).toBe(true);
    expect(result.type).toBe('success');
    
    const nodes = useStore.getState().nodes;
    const edges = useStore.getState().edges;
    
    expect(nodes).toHaveLength(2);
    expect(edges).toHaveLength(1);
    
    // Nodes should maintain "input" type
    expect(nodes[0].type).toBe('input');
    expect(nodes[1].type).toBe('input');
    
    // All properties should be preserved
    expect(nodes[0].data.label).toBe('Main Idea');
    expect(nodes[0].style).toEqual({ width: 150, height: 80 });
    expect(edges[0].source).toBe('node-1');
    expect(edges[0].target).toBe('node-2');
  });

  it('should handle empty nodes array', () => {
    const emptyNodesData = JSON.stringify({
      _metadata: {
        version: "1.0.0",
        format: "mindmap-json",
        author: "Test User",
        exportedAt: new Date().toISOString(),
        description: "Empty mindmap"
      },
      nodes: [],
      edges: []
    });

    const result = useStore.getState().importData(emptyNodesData);
    
    expect(result.success).toBe(true);
    expect(result.type).toBe('success');
    
    const nodes = useStore.getState().nodes;
    expect(nodes).toHaveLength(0);
    expect(Array.isArray(nodes)).toBe(true);
  });

  it('should handle nodes missing type property', () => {
    const noTypeData = JSON.stringify({
      _metadata: {
        version: "1.0.0",
        format: "mindmap-json",
        author: "AI Assistant",
        exportedAt: new Date().toISOString(),
        description: "Nodes without type"
      },
      nodes: [
        { id: '1', data: { label: 'No Type Node 1' }, position: { x: 0, y: 0 } },
        { id: '2', data: { label: 'No Type Node 2' }, position: { x: 100, y: 100 } }
      ],
      edges: []
    });

    const result = useStore.getState().importData(noTypeData);
    
    expect(result.success).toBe(true);
    expect(result.type).toBe('success');
    
    const nodes = useStore.getState().nodes;
    expect(nodes).toHaveLength(2);
    
    // All nodes should have type "input" added
    nodes.forEach(node => {
      expect(node.type).toBe('input');
    });
    
    // Other properties should be preserved
    expect(nodes[0].data.label).toBe('No Type Node 1');
    expect(nodes[1].data.label).toBe('No Type Node 2');
  });

  it('should preserve all node properties during normalization', () => {
    const complexNodeData = JSON.stringify({
      _metadata: {
        version: "1.0.0",
        format: "mindmap-json",
        author: "Test",
        exportedAt: new Date().toISOString(),
        description: "Complex nodes"
      },
      nodes: [
        { 
          id: 'complex-1', 
          type: 'default',
          data: { label: 'Complex Node', customField: 'value' }, 
          position: { x: 100, y: 200 },
          style: { width: 200, height: 100, backgroundColor: '#fff' },
          selected: false,
          dragging: false
        }
      ],
      edges: []
    });

    const result = useStore.getState().importData(complexNodeData);
    
    expect(result.success).toBe(true);
    
    const nodes = useStore.getState().nodes;
    expect(nodes).toHaveLength(1);
    
    const node = nodes[0];
    expect(node.type).toBe('input'); // Type normalized
    expect(node.id).toBe('complex-1');
    expect(node.data.label).toBe('Complex Node');
    expect(node.data.customField).toBe('value');
    expect(node.position).toEqual({ x: 100, y: 200 });
    expect(node.style).toEqual({ width: 200, height: 100, backgroundColor: '#fff' });
    expect(node.selected).toBe(false);
    expect(node.dragging).toBe(false);
  });

  it('should save normalized data to localStorage', () => {
    const testData = JSON.stringify({
      _metadata: {
        version: "1.0.0",
        format: "mindmap-json",
        author: "Test",
        exportedAt: new Date().toISOString(),
        description: "Test"
      },
      nodes: [
        { id: '1', type: 'default', data: { label: 'Test' }, position: { x: 0, y: 0 } }
      ],
      edges: []
    });

    useStore.getState().importData(testData);
    
    const stored = localStorage.getItem('mindmap-data');
    expect(stored).toBeTruthy();
    
    const parsedStored = JSON.parse(stored!);
    expect(parsedStored.nodes).toHaveLength(1);
    expect(parsedStored.nodes[0].type).toBe('input');
  });

  it('should reject invalid file format', () => {
    const invalidData = JSON.stringify({
      nodes: [{ id: '1', type: 'default', data: { label: 'Test' }, position: { x: 0, y: 0 } }],
      edges: []
    });

    const result = useStore.getState().importData(invalidData);
    
    expect(result.success).toBe(false);
    expect(result.type).toBe('error');
    expect(result.message).toContain('Invalid file format');
  });

  it('should reject data missing nodes or edges', () => {
    const missingNodesData = JSON.stringify({
      _metadata: {
        version: "1.0.0",
        format: "mindmap-json",
        author: "Test",
        exportedAt: new Date().toISOString(),
        description: "Missing nodes"
      },
      edges: []
    });

    const result = useStore.getState().importData(missingNodesData);
    
    expect(result.success).toBe(false);
    expect(result.type).toBe('error');
    expect(result.message).toContain('Missing nodes or edges');
  });
});
